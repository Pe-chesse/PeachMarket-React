import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import './home.scss'
import Toparea from "../../components/toparea/toparea";

function Home() {
    return (
        <>
        <div className="home-wrapper">
            <Toparea/>
        <div className="content">
        </div>
            <Navbar/>
        </div>

        </>
    );
}

export default Home;