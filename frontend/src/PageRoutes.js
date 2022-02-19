import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchPage from './SearchPage';
import WordPage from './WordPage';

function PageRoutes () {

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