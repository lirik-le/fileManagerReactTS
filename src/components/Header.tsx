import React from 'react';
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {useCookies} from "react-cookie";
import {logOut} from "../redux/slice/auth/authSlice";
import logout from '../assets/img/logout.png'

const Header = () => {
    const token = useAppSelector((state) => state.auth.token);
    const [, , removeCookie] = useCookies(['jwt']);
    const dispatch = useAppDispatch();

    const logOutAndRemoveCookie = () => {
        removeCookie('jwt', {path: '/'});
        dispatch(logOut())
    }

    return (
        <header className='py-4 bg-gray-100'>
            <div className='flex justify-between w-10/12 mx-auto items-center'>
                <Link to='/' className='font-semibold text-xl'>Мой проводник</Link>
                {
                    token
                        ? <nav onClick={logOutAndRemoveCookie} className='flex items-center cursor-pointer'>
                            <p>Выход</p>
                            <img src={logout} alt="Выход" className='w-6 h-auto ml-2 mt-1'/>
                        </nav>
                        : <nav className='mt-1'>
                            <Link to='login' className='mr-5 cursor-pointer'>Вход</Link>
                            <Link to='register' className='cursor-pointer'>Регистрация</Link>
                        </nav>
                }
            </div>
        </header>
    );
};

export default Header;