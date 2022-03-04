import { Center } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import Login from 'Login';
import PageHeader from 'PageHeader';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import StartPage from 'StartPage';
import SearchPage from './SearchPage';
import WordPage from './WordPage';

function PageRoutes () {

    const navigate = useNavigate();

    return (
        <>
            {Cookies.get('token') != undefined ? <PageHeader /> : ''}
            <Routes>
                {Cookies.get('token') != undefined ? <>
                    <Route path='/word/:word' element={<WordPage />} />
                    <Route path='/start' element={<SearchPage />} />
                </> : 
                <>
                    <Route path='/login' element={<Login />} />
                </>
                }
                <Route path='' element={<StartPage />} />
            </Routes>
        </>
    )
}

export default PageRoutes;