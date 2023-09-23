import React, { useState } from 'react';
import '../styles/toparea.scss';
import { useLocation, useNavigate } from 'react-router-dom';

function Toparea() {
    const navigate = useNavigate();
    const gohome = ()=>{
        navigate('/home/')
    }

    return (
        <>
        <article className="top-area">
            <img src="../img/arrow.png" alt="arrow" onClick={gohome}/>
            <TopareaOption/>
        </article>
        </>
    );
}
export default Toparea




function TopareaOption (){
    const location = useLocation()
    const mebuBar = document.querySelector('.menu-bar');
    const memberModal = document.querySelector('.member-modal');
    const modalBack = document.querySelector('.modal-background');
    const memLogout = document.querySelector('.member-logout')

    const activeModal = () => {
        if(memberModal.className.includes('modal-toggle')){
            memberModal.classList.remove('modal-toggle')
            modalBack.classList.remove('disbl')
        }else{
            memberModal.classList.add('modal-toggle')
            modalBack.classList.add('disbl')
        }
    }

    if(location.pathname === '/profile/'){
        return <img src="../img/top_menu_op.png" alt="top_menu_option" className="menu-bar" onClick={activeModal}/>
    }
    else if(location.pathname === '/search/'){
        return (       
        <form method="get">
        <div className="search">
            <label className="sr-only"></label>
            <input type="search" placeholder="계정 검색" id="user-search" className="userSearch"/>
        </div>
        </form>
        )  
    }
}
