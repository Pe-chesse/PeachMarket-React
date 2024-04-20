import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useRef, useState} from 'react';
import Toparea from "../../components/toparea";

function ChatRoom({ws, chatMessage, verifyUser}) {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [message, setMessage] = useState('')
    const [chatMessages , setChatmessages] = useState([])
    const [otherUser, setOtherUser] = useState(null)
    const [mine, setMine] = useState(null)
    const scrollRef = useRef(null)

    const findOther = (()=>{
        if(chatMessage !== null && verifyUser !== null){
            const findOther = chatMessage.members.filter((e) => e.nickname !== verifyUser.nickname)
            return findOther
        }
    })

    const findMine = (()=>{
        if(chatMessage !== null && verifyUser !== null){
            const findMine = chatMessage.members.filter(e => e.nickname === verifyUser.nickname)
            return findMine
        }
    })

    useMemo(()=>{
        if(chatMessage !== null){
        const otherUser = findOther()
        setOtherUser(otherUser)
        const Mine = findMine()
        setMine(Mine)
    }
    },[chatMessage])

    useEffect(()=>{
        if(chatMessage){
            setChatmessages(chatMessage.messages)
        }
    },[chatMessage])

    // 채팅방 스크롤
    useEffect(()=>{
        if(scrollRef.current){
            scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
        }
    },[chatMessages])

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
    }

    return (
        <div className="chat-wrapper" ref={scrollRef}>
            <Toparea/>

            <div className="chat-room" >
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
                                            <img src={otherUser[0].image_url !== null ? otherUser[0].image_url : '../img/peach_cha.png'}/>
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
                                            <img src={mine[0].image_url !== null ? mine[0].image_url : '../img/peach_cha.png'}/>
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