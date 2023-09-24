import { Link } from 'react-router-dom';
import UserProfileImage from '../profile-image';

const ChatRoomTile = ({ roomInfo }) =>  {
    const roomMember = () => {
        // return roomInfo.members.filter((e) => e.nickname !== user.nickname);
        return roomInfo.members;
      };
      const target = roomMember();
      return (
            <div className="chat-list-index" key={roomInfo.roomname} >
                <UserProfileImage image_url={target[0].image_url}/>
                <Link to={`/chat/room?display=${target[0].nickname}&room=${roomInfo.roomname}`}>
                    <div className="chat-list-content">
                        <h2>{target[0].nickname}</h2>
                        <p>{roomInfo.content}</p>
                    </div>
                    {roomInfo.unread > 0 && (
                        <p className="chat-list-check">{roomInfo.unread}</p>
                    )}
                </Link>
            </div>
      );
}

export default ChatRoomTile;