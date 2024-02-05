import React, { useEffect, useRef, useState } from 'react';
import Toparea from '../toparea';
import { useLocation } from 'react-router-dom';
import api from '../../services/api';
import './postdetail.scss'
import { timeAgo } from '../../utils/time-ago';

function PostDetail({user, verifyUser}) {
    const [postContent, setPostContent] = useState();
    const urlParams = new URLSearchParams(useLocation().search);
    const postid = urlParams.get('postid')

    const [checkReset, setCheckReset] = useState(false)
    const [userInfo,setUserInfo] = useState(null);
    const [commentIndex , setCommentIndex] = useState(null)
    
    const textRef = useRef();
    const childTextRef = useRef();
    const commentRef = useRef();
    console.log(postContent)
    useEffect(()=>{
        async function post (){
            try{
                const postcontent = await api.post.detail(postid)
                setPostContent(postcontent)
                setUserInfo(verifyUser)
                setCheckReset(false)
            }
            catch(error){
                console.log(error)
            }
        }
        if(user !== undefined){
            post();
        }
    },[user, checkReset, verifyUser])

    const registComment = async () => {
        let body = textRef.current.value;
        await api.comment.write(postid, body)
        setCheckReset(true)
        textRef.current.value = ''
    }

    const registChildComment = async (id)=> {
        let body = childTextRef.current.value;
        await api.comment.reply(id, body)
        setCheckReset(true)
        childTextRef.current.value = ''
    }

    const commentToggle = (index) => {
        if(commentIndex === index){
            setCommentIndex(null)
        }
        else{
            setCommentIndex(index)
        }
    }

    return (
        <>
        {
        postContent !== undefined ? 
        <>
            <Toparea/>
            <article className="posting-main">
                <div className="post-user-info">
                    <img className="post-user-img" src={postContent.user.image_url} alt="post-user-img"/>
                    <div className="post-info-data">
                        <h3 className="post-user-info-nick">{postContent.user.nickname}</h3>
                        <p className="post-content-info-time">{timeAgo(postContent.created_at)}</p>
                    </div>
                    <div className="post-state">
                        <div className="post-like">
                            <img src={postContent.is_like === false ? '../img/heart_off.png' : '../img/heart.png'} alt="post-heart"/>
                            <p className="like-count">{postContent.like_length}</p>
                        </div>
                    </div>
                </div>
                
                <div className="post-content">
                    <div className="post-content-text">
                        <p>{postContent.body}</p>
                    </div>
                    <div className="post-content-img">
                        {
                            postContent.image_url.length > 0 ?
                            postContent.image_url.map((a,i)=>{
                                return(
                                <div className='detail-image-area'>
                                    <img className='detail-image' src={a} key={a}/>
                                </div>
                                )
                            })
                            :''
                        }
                    </div>
                </div>

                <div className="comment-write">
                    <div className="comment-write-area">
                        <img className="comment-write-area-user" src={userInfo !== null ? userInfo.image_url ? userInfo.image_url : "../img/peach-user.png"  : ''}alt="comment-write-area-user"/>
                        <input className="comment-write-area-textarea" type="textarea" placeholder="댓글 입력하기" ref={textRef}/>
                        <input className="comment-write-area-submit" type="submit" value="게시" onClick={registComment}/>
                    </div>
                </div>

                <div className="delete-modal-content">

                </div>
                
            </article>
        </>
        :''
        }
        {
        postContent !== undefined ?
        postContent.comment_set.length > 0 ?
            postContent.comment_set.map((a,i)=>{
                return(
                <article className="comment-area" key={a.id}>
                    <div className={`comment-list ${commentIndex === i ? 'active' : ''}`} id={a.id} onClick={() => commentToggle(i)} ref={commentRef}>
                        <img className="comment-list-img" src={a.user.image_url ? a.user.image_url : '../img/peach-user.png'} alt="comment-list-img"/>
                        <div className="comment-list-content">
                            <div className="comment-list-content-info">
                                <h3 className="comment-list-content-info-user">{a.user.nickname}</h3>
                                <p className="comment-list-content-info-time">{timeAgo(a.created_at)}</p>
                            </div>
                            <p className="comment-list-content-text">{a.body}</p>
                        </div>
                        <img className="comment-list-side-icon" src="../img/post_side_icon.png" alt="comment-list-side-icon"/>
                    </div>
                    <div className={`comment-child-input ${commentIndex === i ? 'vi' : ''}`}>
                        <img className='writing-user' src={userInfo !== null ? userInfo.image_url ? userInfo.image_url : "../img/peach-user.png"  : ''} alt='comment-child-user-info'/>
                        <input className="child-comment-write" type="textarea" placeholder="댓글 입력하기" ref={childTextRef}/>
                        <input className="comment-write-area-submit" type="submit" value="게시" onClick={()=>{registChildComment(a.id)}}/>
                    </div>
                    {
                        postContent.comment_set[i].child_comments.length > 0 ?
                        postContent.comment_set[i].child_comments.map((childComment,i)=>{
                            return(
                                <article className="child-area" key={childComment.id}>
                                    <div className="child-comment">
                                        <img className='child-comment-list-img' src={childComment.user.image_url ? childComment.user.image_url : '../img/peach-user.png'}/>
                                        <div className='child-comment-list-content'>
                                            <div className='child-comment-list-content-info'>
                                                <h3 className='child-comment-list-content-info-user'>{childComment.user.nickname}</h3>
                                                <p className="child-comment-list-content-info-time">{timeAgo(childComment.created_at)}</p>
                                            </div>
                                            <p className='child-comment-list-content-text'>
                                            {childComment.body}
                                        </p>
                                        </div>
                                        <img className="comment-list-side-icon" src="../img/post_side_icon.png" alt="comment-list-side-icon"/>
                                    </div>
                                </article>
                            )
                        })
                        :''
                    }
                </article>
                )
            })
        :'':''
        }
        <div className='comment-blank'></div>
        </>
    );
}

export default PostDetail;