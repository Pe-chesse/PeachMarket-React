import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { initAuthListener } from './controllers/auth';
import { useEffect, useState } from 'react';
import React from 'react';
import Index from './pages/index';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import Home from './pages/home/home';
import Profile from './pages/profile/profile';
import Searh from './pages/search/searh';
import ChatList from './pages/chat/list';
import WS from './services/ws';
export let ws;


function App() {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    initAuthListener((user) => {
      if(user != null){
        ws = new WS(user);
        ws.onConnect = () => {
          // if (urlParams.get("room")) {
          //   ws.send(
          //     JSON.stringify({
          //       type: "active_chat",
          //       request: {
          //         chat_room: urlParams.get("room"),
          //       },
          //     })
          //   );
          // }
        };
        ws.onMessage = (message) => {
          const socketData = JSON.parse(message);
          console.log(socketData);
          // switch (socketData.type) {
          //   case "sync.message":
          //     chatInfoState = new ChatInfo(socketData);
          //     if (currentPath == "chat_list.html") {
          //       onPageStateChange(chatInfoState);
          //     }
          //     break;
          //   case "chat_room.info":
          //     chatRoomState = new Chatroom(socketData);
          //     if (currentPath == "chat_room.html") {
          //       onRoomPageStateChange(chatRoomState);
          //       window.scrollTo(0, document.body.scrollHeight);
          //     }
          //     break;
          //   case "chat.message":
          //     chatRoomState = chatRoomState.copyWith({
          //       messages: [...chatRoomState.messages, new Message(socketData)],
          //     });
          //     if (currentPath == "chat_room.html") {
          //       console.log(socketData);
          //       const newMessage = new Message(socketData);
          //       console.log(newMessage);
          //       onRoomPageStateadd(newMessage);
          //       window.scrollTo(0, document.body.scrollHeight);
          //     }
          //     break;
          //   default:
          //     return;
          // }
        };
      }
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
        <Route path='/signup/' element={<Signup/>}/>
        <Route path='/home/' element={<Home/>}/>
        <Route path='/chat/' element={<ChatList/>}/>
        <Route path='/profile/' element={<Profile/>}/>
        <Route path='/search/' element={<Searh/>}/>
        {/* <Route path='/post/:id' element={<PostDetail/>}/> */}
      </Routes>
  );
}

export default App;
