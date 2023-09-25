import React from 'react';
import './write.scss';
import Toparea from '../../components/toparea';
import Navbar from '../../components/navbar';

function Write() {
    return (
    <>
    <Toparea/>
        <article className="upload container">
            <form method="post" action="" className="upload_form">
                <img src="../img/peach-user.png" alt="프로필사진" className="profile_img"/>
                <textarea className="upload_post" id="post-sync" cols="40" rows="6" maxLength="140" placeholder="게시글 입력하기..."></textarea>
                <label htmlFor="file-sync" className="upload_img">이미지 업로드 버튼입니다.</label>
                <input type="file" id="file-sync" accept=".png, .jpg, .jpeg" className="upload_input" multiple />
            </form>
            <div className="img-container"></div>
        </article>
        <Navbar/>
    </>
    );
}

export default Write;