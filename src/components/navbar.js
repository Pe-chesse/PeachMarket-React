import { Link, useLocation } from 'react-router-dom';
import '../styles/navbar.scss'
import { useEffect, useRef, useState } from 'react';
import api from '../services/api';

function Navbar(user) {
    const [navbarCount, setNavbarCount] =useState(0);
    const [verfiyUser, setVerifyUser] = useState(null);

    const location = useLocation();
    useEffect(()=>{
        switch(location.pathname){
            case '/home/':
                setNavbarCount(0);
                break;
            case '/chat/':
                setNavbarCount(1);
                break;
            case '/write/':
                setNavbarCount(2);
                break;
            case '/profile/user':
                setNavbarCount(3);
                break;
        }
    })

    useEffect(()=>{
        async function verfiy (){
            try{
                const data = await api.account.verify()
                setVerifyUser(data)
            }
            catch(error){
                console.log(error)
            }
        }
        verfiy()
      },[user])

    function getUserNickname(){
        
        try{
            return verfiyUser.nickname;
        }catch(e){
            return '';
        }

    }
    
    return (
        <article>
            <nav className="tab-menu">
                <ul className="tab-menu-elements">
                    <li className={`tab-menu-home ${navbarCount === 0 ? 'on' : ''}`}>
                        <Link to="/home/">
                        <button>홈</button>
                        </Link>
                    </li>
                    <li className={`tab-menu-chat ${navbarCount === 1 ? 'on' : ''}`}>
                        <Link to="/chat/">
                        <button >채팅</button>
                        </Link>
                    </li>
                    <li className={`tab-menu-post ${navbarCount === 2 ? 'on' : ''}`}>
                        <Link to="/write/">
                        <button >게시물 작성</button>
                        </Link>
                    </li>
                    <li className={`tab-menu-profile ${navbarCount === 3 ? 'on' : ''}`}>
                    <Link to={`/profile/user?nickname=${getUserNickname()}`}>
                        <button >프로필</button>
                    </Link>
                    </li>
                </ul>
            </nav>
        </article>
    );
}

export default Navbar;