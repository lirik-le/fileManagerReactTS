import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import Main from "./layouts/Main";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GuestRoute from "./components/GuestRoute";
import {CookiesProvider, useCookies} from "react-cookie";
import {setToken} from "./redux/slice/auth/authSlice";
import {useAppDispatch, } from "./redux/store";

function App() {
    const dispatch = useAppDispatch();
    const [cookies] = useCookies(['jwt']);

    useEffect(() => {
        if (cookies.jwt) {
            dispatch(setToken(cookies.jwt));
        }
    }, [cookies, dispatch]);

    return (
        <CookiesProvider>
            <Routes>
                <Route path="/" element={<Main/>}>

                    <Route path='/' element={<Home/>} />

                    <Route element={<GuestRoute/>}>
                        <Route path="login" element={<Login/>}/>
                        <Route path="register" element={<Register/>}/>
                    </Route>

                </Route>
            </Routes>
        </CookiesProvider>
    );
}

export default App;
