import { Link } from "react-router-dom";
import Navbar from "../../components/navbar";
import ChatRoomTile from "../../components/chat/chatroom-tile";
import Toparea from "../../components/toparea";

function ChatList({chatState}) {
    return (
        <div className="home-wrapper">
        <Toparea/>
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