import { Link } from "react-router-dom";
import { useEffect, useState, useMemo} from 'react';
import Navbar from "../../components/navbar";
import './home.scss'
import Toparea from "../../components/toparea";
import api from "../../services/api";
import PostPreview from "../../components/post/preview";

function Home({user}) {
    const [posts, setPosts] = useState([]);
    const [status,setStauts] = useState(false);
    useEffect( () => {

        async function fetchData() {
            try {
                const response = await api.post.list();
                const sortResponse = response.sort((a,b)=> (a.id < b.id ? 1 : -1))
                setPosts(sortResponse);
                setStauts(true)
            } catch (error) {
                console.log(error);
            }
    }
            fetchData();
    },[user, status]);

    return (
        <div className="home-wrapper">
            <Toparea/>
        <div className="content">
            {posts.map((post) => (
                <PostPreview key={post.id} data={post} status={status} setStatus={setStauts}/>
            ))}
        </div>
        <div className='post-blank'></div>
            <Navbar user={user}/>
        </div>
    );
}

export default Home;