import React from 'react';
import '../styles/toparea.scss';
import { useLocation, useNavigate, Link } from 'react-router-dom';

function Toparea({title , searchUser, setSearchUser}) {
    const navigate = useNavigate();
    const navigatePop = ()=>{
        navigate(-1)
    }

//     return (
//         <>
//         <article className="top-area">
//             <img src="../img/arrow.png" alt="arrow" onClick={navigatePop}/>
//             {title != null?<p>{title}</p>:null}
//             <TopareaOption/>
//         </article>
//         </>
//     );
// }
// export default Toparea




// function TopareaOption (){ss
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
    if(location.pathname.includes('/profile/user')){
        return (
        <article className="top-area">
            <img src="../img/arrow.png" alt="arrow" onClick={navigatePop}/>
            <h1>프로필</h1>
            <img src="../img/top_menu_op.png" alt="top_menu_option" className="menu-bar" onClick={activeModal}/>
        </article>
        )
    }
    else if(location.pathname === ('/profile/setting/')){
        return(
        <article className="top-area">
            <img src="../../img/arrow.png" alt="arrow" onClick={navigatePop}/>
            <h1>프로필 수정</h1>
        </article>
        )
    }
    else if(location.pathname === '/search/'){

        return (
        <article className="top-area">
            <img src="../img/arrow.png" alt="arrow" onClick={navigatePop}/>       
            <div className="search" >
                <label className="sr-only"></label>
                <input type="search" placeholder="계정 검색" id="user-search" className="userSearch" autoComplete='off' onChange={(e)=>{
                    setSearchUser(e.target.value)
                }}/>
            </div>
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
    }else if(location.pathname === '/chat/'){
        return(
            <article className="top-area">
                <img src="../img/arrow.png" alt="arrow" onClick={navigatePop}/>       
                <h1>채팅</h1>
                <img src="../img/top_menu_op.png" alt="more_vertical"/>
            </article>
        )
    }else if(location.pathname === '/chat/room'){
        return <img src="../img/top_menu_op.png" alt="top_menu_option" className="menu-bar" />;
    }else if(location.pathname === '/write/'){
        return(
            <article className="top-area">
                <img src="../img/arrow.png" alt="arrow" onClick={navigatePop}/>       
                <h1>글 쓰기</h1>
            </article>
        )
    }
}
export default Toparea
