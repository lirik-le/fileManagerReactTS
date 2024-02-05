import React from 'react';
import {Route, Routes} from "react-router-dom";
import Main from "./layouts/Main";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Public from "./components/Public";
import RequireAuth from "./components/RequireAuth";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Main />}>

                <Route index element={<Public />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />

                <Route element={<RequireAuth />} >
                    <Route path='/qwe' element={<Home />} />
                </Route>

            </Route>
        </Routes>
    );
}

export default App;
