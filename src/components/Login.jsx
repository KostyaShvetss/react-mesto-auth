import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login ( {isLoggedIn, handleAuthorize}) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })

  if (isLoggedIn) {
    navigate('/');
  }

  const handleChange = (e) => {
    const {name, value} = e.target;

    setUserData({
      ...userData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData.email || !userData.password) {
      return
    };

    handleAuthorize(userData)
    .then(() => {
      setUserData({email: '', password: ''});
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit}>
          <h1 className="auth__header">Вход</h1>
          <input id="data-email-input" type="email" className="auth__input" name="email" required minLength="2" maxLength="40" placeholder="Email" onChange={handleChange} value={userData.email}/>
          <input id='data-password-input' type="password" className="auth__input" name="password" required minLength="2" maxLength="200" placeholder="Пароль" autoComplete="on" onChange={handleChange} value={userData.password}/>
          <button type="submit" className="auth__button">Войти</button>
      </form>
    </div>
  )
}

export default Login;
