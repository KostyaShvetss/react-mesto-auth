import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card ({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`element__heart ${isLiked && `element__heart_active`}`)

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick () {
    onCardLike(card);
  }

  function handleTrashBinClick () {
    onCardDelete(card);
  }

  return (
    <article className="element">
      {isOwn && <button aria-label="Удалить карточку" className="element__trash-bin" type="button" onClick={handleTrashBinClick}/>}
      <img src={card.link} alt={card.name} className="element__image" onClick={handleClick}/>
      <div className="element__bar">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__container">
          <button aria-label="Мне нравится" className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} />
          <span className="element__counter">{card.likes.length}</span>
        </div>
      </div>
    </article>
  )
}

export default Card;
