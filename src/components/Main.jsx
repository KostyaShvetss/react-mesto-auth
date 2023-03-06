import React from "react";
import { useContext } from "react";
import Card from "./Card.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main ({handleEditProfileClick, handleAddPlaceClick, handleEditAvatarClick, onCardClick, cards, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__person">
          <div className="profile__avatar-wrapper">
            <img src={currentUser.avatar} alt="Аватар пользователя" className="profile__avatar" onClick={handleEditAvatarClick}/>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__about">{currentUser.about}</p>
            <button type="button" className="profile__edit-button" aria-label="Редактировать" onClick={handleEditProfileClick}></button>
          </div>
        </div>
        <button type="button" className="profile__add-button" aria-label="Добавить" onClick={handleAddPlaceClick}></button>
      </section>
      <section className="elements">
        {cards.map((card) => {
          return <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}/>
        })}
      </section>
    </main>
  )
}

export default Main;
