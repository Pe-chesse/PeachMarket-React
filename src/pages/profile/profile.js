import React, { useEffect, useRef, useState } from 'react';
import './profile.scss'
import Toparea from '../../components/toparea';
import firebaseAuth from '../../services/firebase/auth';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar';
import api from '../../services/api';

function Profile() {
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

    return (
    <>
        <div className="profile-wrapper">
        <Toparea/>
        <section className="main-profile-area">
            <div className="main-profile-follow">
                <a href="./followers.html">
                    <div>
                        <h3 className="followers"></h3>
                        <p>followers</p>
                    </div>
                </a>
                <div className="profile-img">
                    <img src="" alt=""/>
                </div>
                <a href="./followings.html">
                    <div>
                        <h3 className="followings"></h3>
                        <p>followings</p>
                    </div>
                </a>
            </div>
            <div>
                <h2 className="user-nickname"></h2>
                <p className="user-des"></p>
            </div>
            <i className="talk-icon"><img src="../img/icon_comment.png" alt="talk-icon"/></i>
            <div className="profile-op">
                <a href="./my_profile_set.html">프로필 수정</a>
                <a href="./product_write.html">상품 등록</a>
            </div>
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

        <section className="post-section">
            <article className="post">
                <div className="post-userinfo">
                    <div className="post-userinfo-img">
                        
                    </div>

                    <h2 className="user-nick"></h2>
                    <i className="post-side-icon"><img src="../img/post_side_icon.png" alt="post-side-icon"/></i>
                </div>

                <div className="post-content">
                    
                    <p></p>
                </div>

                <div className="post-state">
                    <div className="post-like">
                        <img src="../img/heart_off.png" alt="post-heart"/>
                        <p className="like-count">30</p>
                    </div>
                    <div className="post-comment">
                        <img src="../img/icon_comment.png" alt="post-comment"/>
                        <p className="comment-count">18</p>
                    </div>
                </div>
                <div className="post-date">
                    
                    <p></p>
                </div>
            </article>
        </section>
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
    );
}

export default Profile;