import React from 'react';
import {Link} from "react-router-dom";

const Public = () => {
    return (
        <div>
            <p>Данный сервис позволяет управлять папками и файлами</p>
            <p>Авторизуйтесь для того, чтобы использовать данные возможности</p>
            <Link to='/login'
                  className="text-sm text-blue-500 -200 hover:underline mt-4">Войти</Link>
        </div>
    );
};

export default Public;