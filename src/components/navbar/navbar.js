import { Link, useLocation } from 'react-router-dom';
import './navbar.scss'
import { useEffect, useState } from 'react';

function Navbar() {
    const [navbarCount, setNavbarCount] =useState(0);
    const location = useLocation();
    useEffect(()=>{
        if(location.pathname === '/home/'){
            setNavbarCount(0)
        }else if(location.pathname === '/chat/'){
            setNavbarCount(1)
        }else if(location.pathname === '/write/'){
            setNavbarCount(2)
        }else if(location.pathname === '/profile/'){
            setNavbarCount(3)
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
                        <Link to='/chat/'>
                        <button >채팅</button>
                        </Link>
                    </li>
                    <li className={`tab-menu-post ${navbarCount === 2 ? 'on' : ''}`}>
                        <Link to="/write/">
                        <button >게시물 작성</button>
                        </Link>
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