import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchPage from './SearchPage';
import WordPage from './WordPage';

function PageRoutes () {

    useEffect(() => {
        if (Cookies.get('username')) {
            return;
        } else {
            Cookies.set('username', window.prompt("Username?"));
        }
    }, [])
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/word/:word' element={<WordPage />} />
                <Route path='' element={<SearchPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default PageRoutes;