import { Link, useLocation } from 'react-router-dom';
import '../styles/navbar.scss'
import { useEffect, useRef, useState } from 'react';

function Navbar() {
    const [navbarCount, setNavbarCount] =useState(0);
    const location = useLocation();
    useEffect(()=>{
        switch(location.pathname){
            case '/home/':
                setNavbarCount(0);
                break;
            case '/chat/':
                setNavbarCount(1);
                break;
            case '/home/':
                setNavbarCount(2);
                break;
            case '/profile/':
                setNavbarCount(3);
                break;
        }
    })
    
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
                    <li className="tab-menu-post">
                        <button >게시물 작성</button>
                    </li>
                    <li className={`tab-menu-profile ${navbarCount === 3 ? 'on' : ''}`}>
                    <Link to='/profile/'>
                        <button >프로필</button>
                    </Link>
                    </li>
                </ul>
            </nav>
        </article>
    );
}

export default Navbar;