import React from 'react';
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {useCookies} from "react-cookie";
import {logOut} from "../redux/slice/auth/authSlice";

const Header = () => {
    const token = useAppSelector((state) => state.auth.token);
    const [cookie, setCookie, removeCookie] = useCookies(['jwt']);
    const dispatch = useAppDispatch();

    const logOutAndRemoveCookie = () => {
        removeCookie('jwt', {path: '/'});
        dispatch(logOut())
    }

    return (
        <header>
            <Link to='/'>Главная</Link>
            {
                token
                    ? <nav>
                        <p onClick={logOutAndRemoveCookie}>Выход</p>
                    </nav>
                    : <nav>
                        <Link to='login'>Вход</Link>
                        <Link to='register'>Регистрация</Link>
                    </nav>
            }
        </header>
    );
};

export default Header;