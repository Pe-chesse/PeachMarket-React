import { Link } from "react-router-dom";
import { useEffect, useState} from 'react';
import Navbar from "../../components/navbar";
import './home.scss'
import api from "../../services/api";
import PostPreview from "../../components/post/preview";

function Home() {
    const [posts, setPosts] = useState([]);
    useEffect( () => {
        async function fetchData() {
            try {
                const response = await api.post.list();
                setPosts(response);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
      }, []);
    return (
        <div className="home-wrapper">
        <article className="top-area">
            <strong>
                <Link to="/home/">🍑 PEACH MARKET</Link>
            </strong>
            <Link to='/search/'>
                <img src='/img/search_icon.png' alt="검색아이콘사진"/>
            </Link>
        </article>

        <div className="content">
            {posts.map((post) => (
                <PostPreview key={post.id} data={post} />
            ))}
        </div>
        <Navbar/>
        </div>
    );
}

export default Home;