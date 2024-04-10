import { Link } from 'react-router-dom';
import UserProfileImage from '../profile-image';

const ChatRoomTile = ({ roomInfo, verifyUser }) =>  {
    const roomMember = () => {
        // return roomInfo.members.filter((e) => e.nickname !== user.nickname);
        return roomInfo.members.filter((e)=> e.nickname !== verifyUser.nickname);
      };
      const target = roomMember();
      return (
        <Link to={`/chat/room?display=${target[0].nickname}&room=${roomInfo.roomname}`}>
            <div className="chat-list-index" key={roomInfo.roomname} >
                <UserProfileImage image_url={target[0].image_url !== null ? target[0].image_url : '../img/peach_cha.png'}/>

                    <div className="chat-list-content">
                        <h2>{target[0].nickname}</h2>
                        <p>{roomInfo.content}</p>
                    </div>
                    {roomInfo.unread > 0 && (
                        <p className="chat-list-check">{roomInfo.unread}</p>
                    )}
            </div>
        </Link>
      );
}

export default ChatRoomTile;