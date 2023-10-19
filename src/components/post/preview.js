import { Link } from 'react-router-dom';
import { timeAgo } from '../../utils/time-ago';
import UserProfileImage from '../profile-image';

import { useEffect, useRef, useState } from 'react';
import api from '../../services/api';

const PostPreview = ({ data,status, setStatus}) => {

    const likeRef = useRef();
    const like = async () => {
        const likeTarget = likeRef.current.closest('.post').id
        try{
            await api.post.like(likeTarget)
            .then(()=>{
                setStatus(false)
            })
        }
        catch(err){
            console.log(err)
        }
    }

    return (

        <article className="post" key={data.id} id={data.id} >
        <div className="post-userinfo">
            <UserProfileImage image_url={data.user.image_url}/>
            <h2 className="user-nick"><Link to={`/profile/user?nickname=${data.user.nickname}`}>{data.user.nickname}</Link></h2>
            <p className="timepass">{timeAgo(data.updated_at)}</p>
            
        </div>
        <Link to={`/post/${data.id}`}>
            <div className="post-content">
                <div className="post-image-section">
                {
                data.image_url != ''  && data.image_url.length == 1 ?
                <img className="first-image" src={data.image_url[0]} alt="post-image"/>
                :
                data.image_url.length == 2 ?
                data.image_url.map((a,j)=>{
                    return(
                        <img className="second-image" src={a} alt="post-image"/>
                    )
                }).join(''):
                data.image_url.length > 2 ?
                        <>
                        <img className="third-image" src={data.image_url[0]} alt="post-image"/>
                        <div className="other-image">
                        <img className="third-image" src={data.image_url[1]} alt="post-image"/>
                        <img className="third-image" src={data.image_url[2]} alt="post-image"/>
                        </div>
                        </>
                    : ''
                }
                </div>
            <p>{data.body}</p>
            </div>
        </Link>
            <div className="post-state">
                <div className="post-like" onClick={like} ref={likeRef}>
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
    </article>
    );
}

export default PostPreview;