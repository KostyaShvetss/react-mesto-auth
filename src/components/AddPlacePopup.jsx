import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup ({isOpen, onClose, onAddPlace}) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleNameChange (evt) {
    setName(evt.target.value);
  }

  function handleLinkChange (evt) {
    setLink(evt.target.value);
  }

  function handleSubmit (evt) {
    evt.preventDefault();
    onAddPlace({
      name,
      link})

  }

  return (
    <PopupWithForm
    name='add'
    title='Новое место'
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    buttonText={'Создать'}
    children={
      <>
        <input
          id="name-input"
          type="text"
          className="popup__input popup__input_name"
          name="name"
          minLength="2"
          maxLength="30"
          required
          placeholder="Название"
          onChange={handleNameChange}
          value={name}
        />
        <span
          className="popup__span-error name-input-error"
        />
        <input
          id='url-input'
          type="url"
          className="popup__input popup__input_url"
          name="url"
          required
          placeholder="Ссылка на картинку"
          onChange={handleLinkChange}
          value={link}
        />
        <span
          className="popup__span-error url-input-error"
        />
      </>
    }
  />
  );
}

export default AddPlacePopup;
