import { Link } from "react-router-dom";
import Navbar from "../../components/navbar";
import ChatRoomTile from "../../components/chat/chatroom-tile";
import Toparea from "../../components/toparea";
import './chat.scss'

function ChatList({chatRoomState, verifyUser}) {
    return (
        <>
        <Toparea/>
        <div className="chat-list">
            {chatRoomState != null ? chatRoomState.data.map((roomInfo) => (
                <ChatRoomTile className="chat-list-index" key={roomInfo.roomname} roomInfo={roomInfo} verifyUser={verifyUser} />
            )):null} 
        </div>
        <Navbar/>
        </>
    );
}

export default ChatList;