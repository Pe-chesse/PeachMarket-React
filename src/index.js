import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from './component/GlobalStyle';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import Home from './pages/home/home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <GlobalStyle/>
      <Routes>
        <Route path='/' element={<App/>}></Route>
        <Route path='/login/' element={<Login/>}></Route>
        <Route path = '/signup/' element={<Signup/>}></Route>
        <Route path='/home/' element={<Home/>}></Route>
      </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
