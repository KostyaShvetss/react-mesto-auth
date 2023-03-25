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
            <Route path='/' element={
              <div className="header__container">
                <p className="header__row"></p>
                <p className="header__row header__row_type_gray">1222222</p>
              </div>
            } />
          </Routes>
        </header>
    )
}

export default Header;
