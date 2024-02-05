import React from 'react';
import {useAppSelector} from "../redux/store";
import {Navigate, Outlet, useLocation} from "react-router-dom";

const RequireAuth = () => {
    const token = useAppSelector((state) => state.auth.token);
    console.log(token);
    const location = useLocation();

    return (
        token
            ? <Outlet/>
            : <Navigate to={'/login'} state={{from: location}} replace/>
    );
};

export default RequireAuth;