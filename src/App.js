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
import Write from './pages/write/write';
import ChatList from './pages/chat/list';
import WS from './services/ws';
import { ChatInfo, Chatroom } from './models/chat';
import ChatRoom from './pages/chat/room';


function App() {

  const [user, setUser] = useState(null);
  const [chatState, setChatState] = useState(null);
  const [ws, setWSState] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    initAuthListener((user) => {
      if(user != null){
        const newws = new WS(user);
        setWSState(newws);
        newws.onConnect = () => {
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
        newws.onMessage = (message) => {
          const socketData = JSON.parse(message);
          console.log(socketData);
          switch (socketData.type) {
            case "sync.message":
              const newChatInfo = new ChatInfo(socketData);
              setChatState(newChatInfo);
              break;
            // case "chat_room.info":
            //     onRoomPageStateChange(new Chatroom(socketData));
            //     window.scrollTo(0, document.body.scrollHeight);
            //   break;
            // case "chat.message":
            //   chatRoomState = chatRoomState.copyWith({
            //     messages: [...chatRoomState.messages, new Message(socketData)],
            //   });
            //   if (currentPath == "chat_room.html") {
            //     console.log(socketData);
            //     const newMessage = new Message(socketData);
            //     console.log(newMessage);
            //     onRoomPageStateadd(newMessage);
            //     window.scrollTo(0, document.body.scrollHeight);
            //   }
            //   break;
            default:
              return;
          }
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
        <Route path='/chat/'  element={<ChatList chatState={chatState}/>}/>
        <Route path='/chat/room/'  element={<ChatRoom ws={ws}/>}/>
        <Route path='/profile/' element={<Profile/>}/>
        <Route path='/search/' element={<Searh/>}/>
        <Route path='/write/' element={<Write/>}></Route>
        {/* <Route path='/post/:id' element={<PostDetail/>}/> */}
      </Routes>
  );
}

export default App;
