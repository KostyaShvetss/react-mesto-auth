import React from "react";
import {Link, Routes, Route} from "react-router-dom";
import headerLogo from '../images/logo.svg';

function Header() {
    return (
        <header className="header">
          <img src={headerLogo} alt='Логотип проекта Mesto' className="header__logo"/>
          <Routes>
            <Route path='/sign-in' element={<Link to="/sign-up" className="header__link">Регистрация</Link>} />
            <Route path='/sign-up' element={<Link to="/sign-in" className="header__link">Войти</Link>} />
          </Routes>
        </header>
    )
}

export default Header;
