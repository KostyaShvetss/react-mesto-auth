import React, { useState } from "react";

function Login ( {handleLogin }) {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  })

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const {name, value} = e.target();

    setUserData({
      ...userData,
      [name]: value,
    })

    const handleSubmit = (e) => {
      e.preventDefault();


    }
  }
  return (
    <div className="auth">
      <form className="auth__form">
          <h1 className="auth__header">Вход</h1>
          <input id="data-email-input" type="email" className="auth__input" name="email" required minLength="2" maxLength="40" placeholder="Email" />
          <input id='data-password-input' type="password" className="auth__input" name="password" required minLength="2" maxLength="200" placeholder="Пароль" />
          <button type="submit" className="auth__button">Войти</button>
      </form>
    </div>
  )
}

export default Login;
