import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleNameChange (evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange (evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit (evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    })
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen])

  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={'Сохранить'}
      children={
        <>
          <input id="data-name-input" type="text" className="popup__input popup__input_data_name" name="name" required minLength="2" maxLength="40" placeholder="Введите Ваше имя" value={name} onChange={handleNameChange}/>
          <span className="popup__span-error"></span>
          <input id='data-about-input' type="text" className="popup__input popup__input_data_about" name="about" required minLength="2" maxLength="200" placeholder="Введите информацию о себе" value={description} onChange={handleDescriptionChange}/>
          <span className="popup__span-error"></span>
        </>
      }
    />
  )
}

export default EditProfilePopup;
