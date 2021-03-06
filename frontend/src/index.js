import SearchPage from './SearchPage';
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'
import {
  BrowserRouter,
} from "react-router-dom";
import PageRoutes from './PageRoutes';

ReactDOM.render(
  <React.StrictMode>
      <ChakraProvider>
        <PageRoutes />
      </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
