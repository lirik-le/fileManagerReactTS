import React from 'react';
import {useAppSelector} from "../redux/store";
import {Navigate, Outlet, useLocation} from "react-router-dom";

const GuestRoute = () => {
    const token = useAppSelector((state) => state.auth.token);
    const location = useLocation();

    return (
        token
            ? <Navigate to={'/'} state={{from: location}} replace/>
            : <Outlet/>
    );
};

export default GuestRoute;