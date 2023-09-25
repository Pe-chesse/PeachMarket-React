import React, { useState } from 'react';
import '../styles/toparea.scss';
import { useLocation, useNavigate, Link } from 'react-router-dom';

function Toparea() {
    const navigate = useNavigate();
    const gohome = ()=>{
        navigate('/home/')
    }

    const location = useLocation()
    
    const activeModal = () => {
        const memberModal = document.querySelector('.member-modal');
        const modalBack = document.querySelector('.modal-background');
        
        if(memberModal.className.includes('modal-toggle')){
            memberModal.classList.remove('modal-toggle')
            modalBack.classList.remove('disbl')
        }else{
            memberModal.classList.add('modal-toggle')
            modalBack.classList.add('disbl')
        }
    }

    if(location.pathname === '/profile/'){
        return (
        <article className="top-area">
            <img src="../img/arrow.png" alt="arrow" onClick={gohome}/>
            <img src="../img/top_menu_op.png" alt="top_menu_option" className="menu-bar" onClick={activeModal}/>
        </article>
        )
    }
    else if(location.pathname === '/search/'){
        return (
        <article className="top-area">
            <img src="../img/arrow.png" alt="arrow" onClick={gohome}/>       
            <form method="get">
            <div className="search">
                <label className="sr-only"></label>
                <input type="search" placeholder="계정 검색" id="user-search" className="userSearch"/>
            </div>
            </form>
        </article>
        )  
    }
    else if(location.pathname === '/home/'){
    return (
    <article className="top-area">
        <strong>
            <Link to="/home/">🍑 PEACH MARKET</Link>
        </strong>
        <Link to='/search/'>
            <img src='/img/search_icon.png' alt="검색아이콘사진"/>
        </Link>
    </article>
    )
    }
    else if(location.pathname === '/chat/'){
        return(
        <article className="top-area">
            <img src="../img/arrow.png" alt="arrow" onClick={gohome}/>       
            <h1>🍑 Chat</h1>
            <img src="../img/top_menu_op.png" alt="more_vertical"/>
        </article>
        )

    }
    else if(location.pathname === `/chat/*`){
        return ''
    }else if(location.pathname === '/write/'){
        return(
        <article className="top-area">
            <img src="../img/arrow.png" alt="arrow" onClick={gohome}/>       
            <h1>글 쓰기</h1>
            <button type="button" className="post_btn">업로드</button>
        </article>
    
        )
    }

}
export default Toparea
