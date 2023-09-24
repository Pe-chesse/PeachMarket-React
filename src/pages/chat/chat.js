import React from 'react';
import './chat.scss';
import Toparea from '../../components/toparea/toparea';
import Navbar from '../../components/navbar/navbar';

function Chat() {
    return (
        <>
        <Toparea/>
        <article className="chat-list">
        </article>
        <Navbar/>
        </>
    );
}

export default Chat;