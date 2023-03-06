import React from "react";
import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm.jsx";

function EditAvatarPopup ({isOpen, onClose, onUpdateAvatar}) {
  const ref = useRef();

  function handleSubmit (evt) {
    evt.preventDefault();
    onUpdateAvatar(ref.current.value );
  }

  useEffect (() => {
    ref.current.value = "";
  }, [isOpen])

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={'Да'}
      children={
        <>
          <input ref={ref} id='avatar-input' type="url" className="popup__input popup__input_avatar" name="avatar" required placeholder="Ссылка на картинку"/>
          <span className="popup__span-error avatar-input-error"></span>
        </>
    }
  />
  )
}

export default EditAvatarPopup;
