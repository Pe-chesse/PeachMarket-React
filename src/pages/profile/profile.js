import React, { useEffect, useRef, useState } from 'react';
import './profile.scss'
import Toparea from '../../components/toparea';
import firebaseAuth from '../../services/firebase/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar';
import api from '../../services/api';
import PostPreview from '../../components/post/preview';
import '../home/home.scss'

function Profile(user , verifyUser) {
    const navigate = useNavigate();

    const modalBackRef = useRef();
    const memberModalRef = useRef();
    const memLogoutRef = useRef();

    const modalExit = () => {
        if(memberModalRef.current.className.includes('modal-toggle')){
            memberModalRef.current.classList.remove('modal-toggle')
            modalBackRef.current.classList.remove('disbl')
        }
    }

    const modalLogout = () => {
        memberModalRef.current.classList.remove('modal-toggle')
        memLogoutRef.current.classList.add('disbl')
    }

    const modalLogoutCLose = () => {
        modalBackRef.current.classList.remove('disbl');
        memLogoutRef.current.classList.remove('disbl')
    }

    const logout = () => {
        firebaseAuth.signOut()
        navigate('/')
    }

    // 프로필 정보 가져오기
    const [profileInfo, setProfileInfo] = useState(null);
    const urlParams = new URLSearchParams(useLocation().search);
    const nickname = urlParams.get('nickname');
    const [isfollowing, setIsFollowing] = useState(false);
    const [rendering, setRendering] = useState(false)

    useEffect(()=>{
        async function profile (){
            try{
                const data =  await api.account.getProfile(nickname)
                setProfileInfo(data)
                const followings = await api.account.getFollowing(user.verifyUser.nickname)
                for(let i=0; i < followings.length; i++){
                    if(followings[i].nickname === nickname){
                        setIsFollowing(true)
                    }
                }
            }
            catch(error){
                console.log(error)
            }
        }
        profile()
    },[user, rendering])

    // 유저의 게시글
    const [status,setStauts] = useState(false);

    // 팔로잉 기능
    const followFucn = async() => {
        await api.account.setFollow(nickname)
        setRendering(!rendering)
        setIsFollowing(!isfollowing)
    }

    return (
    <>
    {profileInfo ?
    <>
        <div className="profile-wrapper">
        <Toparea/>
        <section className="main-profile-area">
            <div className="main-profile-follow">
                <Link to={`/profile/followers?nickname=${nickname}`}>
                    <div>
                        <h3 className="followers">{profileInfo.user.followers_length}</h3>
                        <p>followers</p>
                    </div>
                </Link>
                <div className="profile-img">
                    <img src={profileInfo.user.image_url !== null ? profileInfo.user.image_url : "../img/peach-user.png"} alt="user-profile"/>
                </div>
                <Link to={`/profile/followings?nickname=${nickname}`}>
                    <div>
                        <h3 className="followings">{profileInfo.user.followings_length}</h3>
                        <p>followings</p>
                    </div>
                </Link>
            </div>
            <div>
                <h2 className="user-nickname">{profileInfo.user.nickname}</h2>
                <p className="user-des">{profileInfo.user.description}</p>
            </div>
            {
                user.verifyUser.nickname === nickname ? ''
                :
                <i className="talk-icon"><img src="../img/icon_comment.png" alt="talk-icon"/></i>
            }
            {
                user.verifyUser !== null ? 
                nickname !== user.verifyUser.nickname ?
                <div className="follow-btn">
                    <button onClick={followFucn} className={isfollowing ? 'followed' : 'follow'}>{isfollowing ? '언팔로우' : '팔로우'}</button>
                </div>
                :            
                <div className="profile-op">
                    <Link to="/profile/setting/">프로필 수정</Link>
                    <a href="./product_write.html">상품 등록</a>
                </div>
                :''
            }
        </section>

        <section className="product-list">
            <h2 className="product-list-title">판매 중인 상품</h2>
            <article className="product-area">
                <div className="product-item">
                    <div className="item-img">
                        <img src="../img/peach_1.png" alt="peach-img"/>
                    </div>
                    <h3>노지 복숭아</h3>
                    <p>40,000 원</p>
                </div>
                <div className="product-item">
                    <div className="item-img">
                        <img src="../img/peach_2.png" alt="peach-img"/>
                    </div>
                    <h3>노지 복숭아</h3>
                    <p>28,000 원</p>
                </div>
                <div className="product-item">
                    <div className="item-img">
                        <img src="../img/peach_3.png" alt="peach-img"/>
                    </div>
                    <h3>노지 복숭아</h3>
                    <p>28,000 원</p>
                </div>
            </article>
        </section>

        <div className="post-view">
            <button className="list-icon"><img src="../img/icon_list_on.png" alt="img"/></button>
        </div>
        <div className='content-wrap'>
            <div className='content'>
            {
                profileInfo.post.length === 0 ?
                <div className='empty-post'>게시물이 없습니다.</div>:
                profileInfo.post.map((a)=>{
                    return <PostPreview key={a.id} data={a} setStatus={setStauts}/>
                })
            }
            </div>
        <div className='post-blank'></div>
        </div>
        <Navbar/>

        <section className='member-modal' ref={memberModalRef}>
            <img src="../img/modal_rec.png" alt="rec-bar"/>
            <ul>
                <li><p>설정 및 개인정보</p></li>
                <li className="logout" onClick={modalLogout}><p>로그아웃</p></li>
            </ul>
        </section>
        <div className="modal-background" ref={modalBackRef} onClick={modalExit}></div>
    </div>

    <section className="member-logout" ref={memLogoutRef}>
        <p>로그아웃 하시겠어요?</p>
        <ul>
            <li onClick={modalLogoutCLose}>취소</li>
            <li className="logout-btn" onClick={()=>{
                modalLogoutCLose()
                logout()
            }}>로그아웃</li>
        </ul>
    </section>
    </>
: ''    
}
    </>
    );
}

export default Profile;