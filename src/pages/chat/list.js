import { Link } from "react-router-dom";
import { useEffect, useState} from 'react';
import Navbar from "../../components/navbar";
import api from "../../services/api";
import PostPreview from "../../components/post/preview";

function ChatList() {
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
                <Link to="/chat/">🍑 Chat</Link>
            </strong>
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

export default ChatList;