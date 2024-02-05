import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div>
            <Link to='/'>Главная</Link>
            <Link to='login'>Вход</Link>
            <Link to='register'>Регистрация</Link>
        </div>
    );
};

export default Header;