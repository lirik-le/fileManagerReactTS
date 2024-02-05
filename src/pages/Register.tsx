import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useRegisterQMutation} from "../redux/slice/authApiSlice";

const Register = () => {
    const navigate = useNavigate();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const [registerQ] = useRegisterQMutation();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const userData = await registerQ({login, password}).unwrap();
            setLogin('');
            setPassword('');
            console.log(userData)
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
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Регистрация</h2>
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

                            <p className="text-gray-900 mt-4"> Есть аккаунт? <Link to='/login'
                                                                                   className="text-sm text-blue-500 -200 hover:underline mt-4">Войти</Link>
                            </p>
                        </div>
                        <button type="submit"
                                className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150">Зарегистрироваться
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;