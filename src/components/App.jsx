import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from './Header.jsx';
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import ImagePopup from "./ImagePopup.jsx";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from "./AddPlacePopup.jsx";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import InfoTooltip from './InfoTooltip.jsx';
import * as auth from '../utils/Auth.js';


function App() {
  const navigate = useNavigate();
  const [isEditProfileOpened, setIsEditProfileOpened] = useState(false);
  const [isAddPlaceOpened, setIsAddPlaceOpened] = useState(false);
  const [isEditAvatarOpened, setIsEditAvatarOpened] = useState(false);
  const [isImagePopupOpened, setIsImagePopupOpened] = useState(false);
  const [isInfoToolTipOpened, setIsInfoToolTipOpened] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isAuthOk, setIsAuthOk] = useState(false);


  function handleEditProfileClick () {
    setIsEditProfileOpened(true);
  }

  function handleAddPlaceClick () {
    setIsAddPlaceOpened(true);
  }

  function handleEditAvatarClick () {
    setIsEditAvatarOpened(true);
  }

  function handleCardClick () {
    setIsImagePopupOpened(true);
  }

  function handleUpdateUser (data) {
    api
      .editProfile(data)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
    })
    .catch(err => console.log(err));
  }

  function handleUpdateAvatar (data) {
    api
      .changeAvatar(data)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleAddPlaceSubmit (data) {
    api
      .addCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
  }

  function handleCardDelete (card) {
    api.deleteCard(card._id)
    .then(() => {
      const newCardState = cards.filter((cardElement) => {
        return (cardElement._id !== card._id);
      })
      setCards(newCardState);
    }).catch(err => console.log(err));
  }

  function handleCardLike (card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (isLiked) {
      api.deleteLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch(err => console.log(err));
    } else {
      api.putLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch(err => console.log(err));
    }
  }

  const handleRegister = ({email, password}) => {
    return auth.register(email, password).then((res) => {
      if (res) {
        setIsAuthOk(true);
        navigate("/sign-in");
      }
    }).catch(err => {
      setIsAuthOk(false);
      console.log(`Произошла ошибка: ${err}`)
    }).finally(() => setIsInfoToolTipOpened(true));
  }

  const handleAuthorize = ({password, email}) => {
    return auth.authorize(email, password).then((res) => {
      console.log(res);
      if (res.token) {
        setUserEmail(email);
        console.log(userEmail);
        console.log(email);
        setIsLoggedIn(true);
        localStorage.setItem('jwt', res.token);
        navigate('/');
      }
    })
  }

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    navigate('/sign-in');
  }

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt).then(res => {
        setIsLoggedIn(true);
        setUserEmail(res.data.email);
        navigate('/')
      })
    }
  }

  useEffect(() => {
    tokenCheck();
  }, [])

  useEffect(() => {
    api.getInitialData().then(([user, cards]) => {
      setCurrentUser(user);
      setCards(cards);
    }).catch(err => console.log(err));
  }, [])

  function closeAllPopups () {
    setIsEditProfileOpened(false);
    setIsAddPlaceOpened(false);
    setIsEditAvatarOpened(false);
    setIsImagePopupOpened(false);
    setIsInfoToolTipOpened(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
            <Header userEmail={userEmail} handleSignOut={handleSignOut}/>
            <Routes>
              <Route
                path="/sign-up"
                element={
                  <div>
                    <Register isLoggedIn={isLoggedIn} handleRegister={handleRegister}/>
                  </div>
                }/>

              <Route
                path="/sign-in"
                element={
                  <div>
                    <Login isLoggedIn={isLoggedIn} handleAuthorize={handleAuthorize}/>
                  </div>
                }/>


              <Route
                path="*"
                element={isLoggedIn ? <Navigate to='/'/> : <Navigate to='/sign-up'/> }
              />
              <Route
                path='/'
                element={<ProtectedRoute
                  component={Main}
                  handleEditProfileClick={handleEditProfileClick}
                  handleAddPlaceClick={handleAddPlaceClick}
                  handleEditAvatarClick={handleEditAvatarClick}
                  cards={cards}
                  onCardLike = {handleCardLike}
                  onCardDelete = {handleCardDelete}
                  isLoggedIn = {isLoggedIn}
                  onCardClick={(card) => {
                    handleCardClick();
                    setSelectedCard(card)}
                  }/>}
                  />
            </Routes>
            {/* <Main
              handleEditProfileClick={handleEditProfileClick}
              handleAddPlaceClick={handleAddPlaceClick}
              handleEditAvatarClick={handleEditAvatarClick}
              cards={cards}
              onCardLike = {handleCardLike}
              onCardDelete = {handleCardDelete}
              onCardClick={(card) => {
                handleCardClick();
                setSelectedCard(card)}}/> */}
            <Footer/>
              <EditProfilePopup
                isOpen={isEditProfileOpened}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}/>
              <AddPlacePopup
                isOpen={isAddPlaceOpened}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
              />
              <EditAvatarPopup
                isOpen={isEditAvatarOpened}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}/>
              <ImagePopup isOpen={isImagePopupOpened} card={selectedCard} onClose={closeAllPopups}/>
              <InfoTooltip
                name={"tool-tip"}
                isOpen={isInfoToolTipOpened}
                onClose={closeAllPopups}
                isAuthOk={isAuthOk}/>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
