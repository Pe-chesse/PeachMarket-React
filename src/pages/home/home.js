import { Link } from "react-router-dom";
import { useEffect, useState} from 'react';
import Navbar from "../../components/navbar";
import './home.scss'
import Toparea from "../../components/toparea";
import api from "../../services/api";
import PostPreview from "../../components/post/preview";

function Home() {
    const [posts, setPosts] = useState([]);
    
    useEffect( () => {
        async function fetchData() {
            try {
                const response = await api.post.list();
                const sortResponse = response.sort((a,b)=> (a.id < b.id ? 1 : -1))
                setPosts(sortResponse);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
      }, []);
    return (
        <div className="home-wrapper">
            <Toparea/>
        <div className="content">
            {posts.map((post) => (
                <PostPreview key={post.id} data={post} />
            ))}
        </div>
        <div className='post-blank'></div>
            <Navbar/>
        </div>
    );
}

export default Home;