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

function App() {
  const navigate = useNavigate();
  const [isEditProfileOpened, setIsEditProfileOpened] = useState(false);
  const [isAddPlaceOpened, setIsAddPlaceOpened] = useState(false);
  const [isEditAvatarOpened, setIsEditAvatarOpened] = useState(false);
  const [isImagePopupOpened, setIsImagePopupOpened] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);


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
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
            <Header />
            <Routes>
              <Route
                path="/sign-up"
                element={
                  <div>
                    <Register/>
                  </div>
                }/>

              <Route
                path="/sign-in"
                element={
                  <div>
                    <Login/>
                  </div>
                }/>

{/*
              <Route
                path="*"
                element={isLoggedIn ? <Navigate to='/'/> : <Navigate to='/sign-in'/> }
              /> */}
            </Routes>

            <Main
              handleEditProfileClick={handleEditProfileClick}
              handleAddPlaceClick={handleAddPlaceClick}
              handleEditAvatarClick={handleEditAvatarClick}
              cards={cards}
              onCardLike = {handleCardLike}
              onCardDelete = {handleCardDelete}
              onCardClick={(card) => {
                handleCardClick();
                setSelectedCard(card)}}/>
            <Footer/>
            {
              <EditProfilePopup
                isOpen={isEditProfileOpened}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}/>
            }
            {
              <AddPlacePopup
                isOpen={isAddPlaceOpened}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
              />
            }
            {
              <EditAvatarPopup
                isOpen={isEditAvatarOpened}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}/>
            }
            {
              <ImagePopup isOpen={isImagePopupOpened} card={selectedCard} onClose={closeAllPopups}/>
            }
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
