import { Link } from "react-router-dom";
import Navbar from "../../component/navbar/navbar";
import './home.scss'

function Home() {
    return (
        <>
        <div className="home-wrapper">
        <article className="top-area">
            <strong>
                <Link to="/home/">🍑 PEACH MARKET</Link>
            </strong>
            <img src='/img/search_icon.png' alt="검색아이콘사진"/>
        </article>

        <div className="content">
        </div>
        <Navbar/>
        </div>

        </>
    );
}

export default Home;