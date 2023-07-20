import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import MainPage from '../pages/MainPage/MainPage';
import RegistPage from '../pages/RegistPage/RegistPage';

const MyRoute = ({ isLogin }) => {

    console.log(isLogin)

    if (isLogin) {
        return (
            <Routes>
                <Route path='/main/*' element={<MainPage />} />
                <Route path="*" element={<Navigate to={'/main'} />} />
                <Route path='/login' element={<Navigate to={'/main'} />} />
                <Route path='/' element={<Navigate to={'/main'} />} />
            </Routes>
        );
    }
    return (
        <Routes>
            <Route path='/register' element={<RegistPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/main/*' element={<Navigate to={'/login'} />} />
            <Route path="*" element={<Navigate to={'/login'} />} />
        </Routes>
    );
};

export default MyRoute;