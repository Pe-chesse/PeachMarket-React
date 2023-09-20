import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { initAuthListener } from './controllers/auth';
import { useEffect, useState } from 'react';
import React from 'react';
import Index from './pages/index';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import Home from './pages/home/home';
import Profile from './pages/profile/profile';


function App() {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    initAuthListener((user) => {
      setUser(user);
    });
  }, []); // 이니셜라이징

  // useEffect(() => {
  //   const isAllowedPage = ['/','/login/','/signup/'].includes(location.pathname);
  //   if(user != null){ // 로그인상태
  //     if(isAllowedPage){
  //       navigate('/home/');
  //     }
  //   }else if(!isAllowedPage){
  //       navigate('/');
  //   }
  // }, [user,location.pathname, navigate]);

  return (
      <Routes>
        <Route path='/' element={<Index/>}/>
        <Route path='/login/' element={<Login/>}/>
        <Route path = '/signup/' element={<Signup/>}/>
        <Route path='/home/' element={<Home/>}/>
        <Route path='/profile/' element={<Profile/>}/>
      </Routes>
  );
}

export default App;
