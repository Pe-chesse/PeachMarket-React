import './navbar.scss'

function Navbar() {
    return (
        <article>
            <nav className="tab-menu">
                <ul className="tab-menu-elements">
                    <li className="tab-menu-home on">
                        <a href="./homepage.html">홈</a>
                    </li>
                    <li className="tab-menu-chat">
                        <a href="./chat_list.html">채팅</a>
                    </li>
                    <li className="tab-menu-post">
                        <a href="./post_write.html">게시물 작성</a>
                    </li>
                    <li className="tab-menu-profile">
                        <a href="">프로필</a>
                    </li>
                </ul>
            </nav>
        </article>
    );
}

export default Navbar;