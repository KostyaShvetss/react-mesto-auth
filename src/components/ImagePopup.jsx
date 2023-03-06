import React from "react";

function ImagePopup ({isOpen, card, onClose}) {
  return (
    <div className={`popup popup-image` + (isOpen ? ' popup_opened' : '')}>
      <article className="popup-image__container">
        <button className="popup__close" aria-label="Закрыть картинку" type="button" onClick={onClose}></button>
        <img src={card.link} alt={card.name} className="popup-image__content"/>
        <p className="popup-image__caption">{card.name}</p>
      </article>
    </div>
  )
}

export default ImagePopup;
