import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Box, ChakraProvider } from '@chakra-ui/react'
import PageRoutes from './PageRoutes';
import PageHeader from 'PageHeader';
import Cookies from 'js-cookie';

ReactDOM.render(
  <React.StrictMode>
      <ChakraProvider>
        {Cookies.get('token') != undefined ? <PageHeader /> : ''}
        <Box height='calc(100vh - 100px)'>
          <PageRoutes/>
        </Box>
      </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
