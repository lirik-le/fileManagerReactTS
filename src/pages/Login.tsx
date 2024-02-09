import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useLoginQMutation} from "../redux/slice/auth/authApiSlice";
import {useAppDispatch} from "../redux/store";
import {setToken} from "../redux/slice/auth/authSlice";
import {useCookies} from "react-cookie";


const Login = () => {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['jwt']);

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const [loginQ] = useLoginQMutation();
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const token = await loginQ({login, password}).unwrap();
            setCookie('jwt', token, { path: '/' });
            dispatch(setToken(token));
            setLogin('');
            setPassword('');
            navigate('/');
        } catch (error) {
            console.log(error)
        }
    }

    const handleLoginInput = (e: any) => setLogin(e.target.value);
    const handlePasswordInput = (e: any) => setPassword(e.target.value);

    return (
        <div>
            <div className="flex flex-col items-center justify-center h-full">
                <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Вход</h2>
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        <input type="text"
                               className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                               placeholder="Логин"
                               value={login}
                               onChange={handleLoginInput}
                               required/>
                        <input type="password"
                               className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                               placeholder="Пароль"
                               value={password}
                               onChange={handlePasswordInput}
                               required/>
                        <div className="flex items-center justify-between flex-wrap">

                            <p className="text-gray-900 mt-4"> Нет аккаунта? <Link to='/register'
                                                                                   className="text-sm text-blue-500 -200 hover:underline mt-4">Зарегистрироваться</Link>
                            </p>
                        </div>
                        <button type="submit"
                                className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150">Войти
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;