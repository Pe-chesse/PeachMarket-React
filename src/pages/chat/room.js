import { Link, useLocation } from "react-router-dom";
import { useEffect, useState} from 'react';
import Toparea from "../../components/toparea";

function ChatRoom({ws, chatState, chatMessage, setChatController, verifyUser}) {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [message, setMessage] = useState('')
    const [chatMessages , setChatmessages] = useState([])
    const [messageController, setMessageController] = useState(false)

    useEffect(()=>{
        if(chatMessage){
            setChatmessages(chatMessage.messages)
        }
        setMessageController(false)
    },[chatMessage, messageController])

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

    // 메세지 전송
    const sendMessage = (e)=>{
        e.preventDefault();
        ws.send(
            JSON.stringify({
                type: "send_chat",
                request: {
                    chat_room: params.get('room')
                },
                content: message
            })
        )
        setMessage('')
        setMessageController(true)
        setChatController(true)
    }

    return (
        <div className="chat-wrapper">
            <Toparea/>

            <div className="chat-room">
                {
                    chatMessages ?
                    chatMessages.map((a,i)=>{
                        return(
                            <div className={a.user.nickname !== verifyUser.nickname ? 'chat-content' : 'chat-content flex-end'} key={a.num} >
                                <div className={a.user.nickname !== verifyUser.nickname ? 'chat-room-they' : 'chat-room-my'}>
                                    {
                                        a.user.nickname !== verifyUser.nickname ?
                                        <>
                                        <div className="user-icon">
                                            <img src={chatMessage.members[0].image_url !== null ? chatMessage.members[0].image_url : '../img/peach_cha.png'}/>
                                        </div>
                                        <div className="message-content">
                                            <p>{a.content}</p>
                                        </div>
                                        <div className="chat-message-time">
                                            <p>{a.time}</p>
                                        </div>
                                        </> :
                                        <>
                                        <div className="chat-message-time">
                                            <p>{a.time}</p>
                                        </div>
                                        <div className="message-content">
                                            <p>{a.content}</p>
                                        </div>
                                        <div className="user-icon">
                                            <img src={chatMessage.members[1].image_url !== null ? chatMessage.members[1].image_url : '../img/peach_cha.png'}/>
                                        </div>
                                        </>
                                    }
                                </div>
                            </div>
                        )
                    })
                    :''
                }
            </div>

            <form className="message-area" onSubmit={sendMessage}>
                <input className="message-send" 
                placeholder="채팅 입력하기"
                value={message}
                onChange={(e)=>{setMessage(e.target.value)}}
                ></input>
                <button 
                type="submit"
                className='send-button'>보내기</button>
            </form>
        </div>

    );
}

export default ChatRoom;