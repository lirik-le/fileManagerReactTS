import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useLoginQMutation} from "../redux/slice/auth/authApiSlice";
import {useAppDispatch} from "../redux/store";
import {setToken} from "../redux/slice/auth/authSlice";
import {useCookies} from "react-cookie";
import hiddenPassword from "../assets/img/hiddenPassword.png";
import viewPassword from "../assets/img/viewPassword.png";

type errorType = {

}

const Login = () => {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['jwt']);

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [loginQ] = useLoginQMutation();
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const {token} = await loginQ({login, password}).unwrap();
            setCookie('jwt', token, { path: '/' });
            dispatch(setToken(token));
            setLogin('');
            setPassword('');
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    const handleLoginInput = (e: any) => setLogin(e.target.value);
    const handlePasswordInput = (e: any) => setPassword(e.target.value);

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen-no-header pb-40">
                <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Вход</h2>
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        <input type="text"
                               className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                               placeholder="Логин"
                               value={login}
                               onChange={handleLoginInput}
                               />
                        <div className='relative'>
                            <input type={showPassword ? 'text' : 'password'}
                                   className="w-full bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                   placeholder="Пароль"
                                   value={password}
                                   onChange={handlePasswordInput}
                                   >
                            </input>
                            <img className='absolute w-6 h-auto top-2 right-3'
                                 onClick={() => setShowPassword(!showPassword)}
                                 src={showPassword ? hiddenPassword : viewPassword} alt="Скрыть пароль"/>
                        </div>
                        <div className="flex items-center justify-between flex-wrap">

                            <p className="text-gray-900 mt-4"> Нет аккаунта? <Link to='/register'
                                                                                   className="text-sm text-blue-500 -200 hover:underline mt-4">Зарегистрироваться</Link>
                            </p>
                        </div>
                        <button type="submit"
                                className="button-class">Войти
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;