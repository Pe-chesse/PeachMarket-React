import { Link, useLocation } from "react-router-dom";
import { useEffect, useState} from 'react';
import Navbar from "../../components/navbar";
import ChatRoomTile from "../../components/chat/chatroom-tile";
import Toparea from "../../components/toparea";

function ChatRoom({ws}) {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const display = params.get('display');
  
    // const [posts, setPosts] = useState([]);
    // useEffect( () => {
    //     async function fetchData() {
    //         try {
    //             const response = await api.post.list();
    //             setPosts(response);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     fetchData();
    //   }, []);
    return (
        <div className="chat-wrapper">
        <Toparea title={display}/>

        <div className="content">
        </div>
        </div>
    );
}

export default ChatRoom;