import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register ( {isLoggedIn, handleRegister }) {
  const navigate = useNavigate();

  if (isLoggedIn) {
    navigate('/');
  }

  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;

    setUserData({
      ...userData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    handleRegister(userData);
  }

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit}>
          <h1 className="auth__header">Регистрация</h1>
          <input id="data-email-input" type="email" className="auth__input" name="email" required minLength="2" maxLength="40" placeholder="Email" onChange={handleChange} value={userData.email}/>
          <input id='data-password-input' type="password" className="auth__input" name="password" required minLength="2" maxLength="200" placeholder="Пароль" autoComplete="on" onChange={handleChange} value={userData.password}/>
          <button type="submit" className="auth__button">Зарегистрироваться</button>
          <Link to='/sign-in' className="auth__link">
          Уже зарегистрированы? Войти
          </Link>
      </form>
    </div>
  )
}

export default Register;
