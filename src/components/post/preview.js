import { Link } from 'react-router-dom';
import { timeAgo } from '../../utils/time-ago';
// import { useEffect, useRef, useState } from 'react';

const PostPreview = ({ data }) =>  {
    // const [navbarCount, setNavbarCount] =useState(0);
    // const location = useLocation();
    // useEffect(()=>{
    //     if(location.pathname === '/home/'){
    //         setNavbarCount(0)
    //     }else if(location.pathname === '/profile/'){
    //         setNavbarCount(3)
    //     }
    // })
    return (

        <article className="post" key={data.id} >
        <div className="post-userinfo">
            <div className="post-userinfo-img">
                {data.user.image_url == null || "" ? <img src="../img/peach_cha.png" alt="post-profile-img"/> :<img src={data.user.image_url} alt="user-profile-image"/>}
            </div>
            
            <h2 className="user-nick"><a href="./my_profile.html?nickname=${sortContent[i].user.nickname}">{data.user.nickname}</a></h2>
            {/* <p className="timepass">{timeAgo(data.updated_at.substr(0,10))}</p> */}
            
        </div>
        <Link to={`/post/${data.id}`}>
            <div className="post-content">
            <p>{data.body}</p>
            </div>

            <div className="post-state">
                <div className="post-like">
                    {data.is_like == false ? <img src="../img/heart_off.png" alt="post-heart" className="like-icon"/> : <img src="../img/heart.png" alt="like_icon" className="like-icon"/> }
                    <p className="like-count">{data.like_length}</p>
                </div>
                <div className="post-comment">
                    <img src="../img/icon_comment.png" alt="post-comment"/>
                    <p className="comment-count">{data.comment_length}</p>
                </div>
            </div>
            <div className="post-date">
                <p>{data.updated_at.substr(0,10)}</p>
            </div>
        </Link>
    </article>
    );
}

export default PostPreview;