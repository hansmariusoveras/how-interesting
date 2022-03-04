import Cookies from 'js-cookie';
import Login from 'Login';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import SearchPage from './SearchPage';
import WordPage from './WordPage';

function PageRoutes () {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/word/:word' element={<WordPage />} />
                <Route path='' element={Cookies.get('token') == undefined ? <Login /> :<SearchPage />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default PageRoutes;