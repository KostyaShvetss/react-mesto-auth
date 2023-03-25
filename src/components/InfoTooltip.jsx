import React from "react";
import tickTip from '../images/Tick.png';
import crossTip from '../images/Cross.png'

function InfoTooltip (props) {
  return (
    <div className={`popup ${props.name}-popup` + (props.isOpen ? ' popup_opened' : '') }>
    <div className="popup__container">
      <button className="popup__close" type="button" aria-label="Закрыть окно" onClick={props.onClose}></button>
      <img className="popup__icon" src={props.isAuthOk ? tickTip : crossTip}/>
      <h2 className="popup__title popup__title_centered">{props.isAuthOk ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
    </div>
  </div>
  )
}

export default InfoTooltip;
