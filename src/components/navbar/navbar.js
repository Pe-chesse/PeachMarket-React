import { Link } from 'react-router-dom';
import './navbar.scss'

function Navbar() {
    return (
        <article>
            <nav className="tab-menu">
                <ul className="tab-menu-elements">
                    <li className="tab-menu-home on">
                        <button>
                        <Link to="/home/">홈</Link>
                        </button>
                    </li>
                    <li className="tab-menu-chat">
                        <button >채팅</button>
                    </li>
                    <li className="tab-menu-post">
                        <button >게시물 작성</button>
                    </li>
                    <li className="tab-menu-profile">
                        <button >프로필</button>
                    </li>
                </ul>
            </nav>
        </article>
    );
}

export default Navbar;