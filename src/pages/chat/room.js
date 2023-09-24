import { Link } from "react-router-dom";
import { useEffect, useState} from 'react';
import Navbar from "../../components/navbar";
import ChatRoomTile from "../../components/chat/chatroom-tile";

function ChatRoom({chatState}) {
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
        <div className="home-wrapper">
        <article className="top-area">
            <strong>
                <Link to="/chat/">🍑 Chat</Link>
            </strong>
        </article>

        <div className="content">
            {chatState != null ? chatState.data.map((roomInfo) => (
                <ChatRoomTile key={roomInfo.roomname} roomInfo={roomInfo} />
            )):null} 
        </div>
        <Navbar/>
        </div>
    );
}

export default ChatList;