import React, {FC, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useRegisterQMutation} from "../redux/slice/auth/authApiSlice";
import hiddenPassword from '../assets/img/hiddenPassword.png';
import viewPassword from '../assets/img/viewPassword.png';

const Register: FC = () => {
    const navigate = useNavigate();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [inputErrors, setInputErrors] = useState({'login': '', 'password': ''});
    const [formErrors, setFormErrors] = useState('');

    const [registerQ] = useRegisterQMutation();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setInputErrors({'login': '', 'password': ''});
        setFormErrors('');

        try {
            await registerQ({login, password}).unwrap();
            setLogin('');
            setPassword('');
            navigate('/login');
        } catch (error: any) {
            if (error.data.errors)
                setInputErrors(error.data.errors);
            else
                setFormErrors(error.data.message);
        }
    }

    const handleLoginInput = (e: any) => setLogin(e.target.value);
    const handlePasswordInput = (e: any) => setPassword(e.target.value);

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen-no-header pb-40">
                <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 ">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Регистрация</h2>
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        <input type="text"
                               className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                               placeholder="Логин"
                               value={login}
                               onChange={handleLoginInput}/>
                        {inputErrors.login && <p className="text-red-500">{inputErrors.login}</p>}
                        <div className='relative'>
                            <input type={showPassword ? 'text' : 'password'}
                                   className="w-full bg-gray-100 text-gray-900 border-0 rounded-md p-2 mt-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                   placeholder="Пароль"
                                   value={password}
                                   onChange={handlePasswordInput}>
                            </input>
                            <img className='absolute w-6 h-auto top-[23px] right-3'
                                 onClick={() => setShowPassword(!showPassword)}
                                 src={showPassword ? hiddenPassword : viewPassword} alt="Скрыть пароль"/>
                        </div>
                        {inputErrors.password && <p className="text-red-500">{inputErrors.password}</p>}
                        <div className="flex items-center justify-between flex-wrap">
                            <p className="text-gray-900 mt-4"> Есть аккаунт?
                                <Link to='/login'
                                      className="text-sm text-blue-500 -200 hover:underline mt-4 pl-2">Войти</Link>
                            </p>
                        </div>
                        {!inputErrors.password && !inputErrors.login && <p className="text-red-700">{formErrors}</p>}
                        <button type="submit"
                                className="button-class">Зарегистрироваться
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;