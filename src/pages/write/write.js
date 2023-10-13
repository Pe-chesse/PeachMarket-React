import React, { useEffect, useRef, useState } from 'react';
import './write.scss';
import Toparea from '../../components/toparea';
import Navbar from '../../components/navbar';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

function Write(user) {
    const [imageKeys, setImageKeys] = useState([]);
    const textareaRef = useRef();
    const navigate = useNavigate();
    // 이미지 선택 및 키 생성
    const imageConfirm = async (e)=>{
        const selectedfiles = e.target.files;
        const newImageKeys = [];
        if(selectedfiles){
            try{
                for(let i=0; i < selectedfiles.length; i++){
                    const data = await api.bucket.media(selectedfiles)
                    newImageKeys.push(data.image_keys[i])
                    setImageKeys([...imageKeys, ...newImageKeys])
                }
            }
            catch(err){
                console.log(err)
            }
        }
    }

    // 이미지 요소 및 키 제거
    const imageDelete = async (e)=>{
        const deleteElement = e.target.closest('.delete');
        if (deleteElement) {
            const imagenumber = parseInt(deleteElement.id, 10);
            if (!isNaN(imagenumber) && imagenumber >= 0 && imagenumber < imageKeys.length) {
                // 유효한 인덱스인 경우 삭제
                const updatedImageKeys = [...imageKeys];
                updatedImageKeys.splice(imagenumber, 1);
                setImageKeys(updatedImageKeys);
            }
        }
    }

    useEffect(()=>{
    },[imageKeys])

    // 글 작성 버튼 클릭 시
    const submitPost = async ()=>{
        let body = {
            body: textareaRef.current.value,
            image_keys: imageKeys,
        }
        await api.post.write(body)
        navigate('/home/')
    }

    return (
    <>
    <Toparea/>
    <button type="button" className="post_btn" onClick={submitPost}>업로드</button>
        <article className="upload container">
            <form method="post" action="" className="upload_form">
                <img src={user.user.image_url === null ? "../img/peach-user.png" : user.user.image_url} alt="프로필사진" className="profile_img"/>
                <textarea className="upload_post" id="post-sync" placeholder="게시글 입력하기..." ref={textareaRef} row={1}></textarea>
                <label htmlFor="file-sync" className="upload_img">이미지 업로드 버튼입니다.</label>
                <input type="file" id="file-sync" accept=".png, .jpg, .jpeg" className="upload_input" multiple onChange={imageConfirm}/>
            </form>
            <div className="img-container">
            {imageKeys.map((imageKey, i) => (
            
            <div className='img-box'>
                <div className='img-wrap'>
                    <img
                    className="img-set"
                    src={`http://3.37.239.49/api/v1/bucket/media/?key=${imageKey}`}
                    id={i}
                    alt="imgset"
                    key={i}
                    />
                </div>
                <div className='delete' id={i} onClick={imageDelete}>
                    <div className='delete-btn'>
                    <i></i>
                    <i></i>
                    </div>
                </div>
            </div>

            ))}
            </div>
        </article>
        <Navbar/>
    </>
    );
}

export default Write;