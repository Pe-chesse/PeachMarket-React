import React, { useEffect, useRef, useState } from 'react';
import Toparea from '../../components/toparea';
import './profile.scss'
import api from '../../services/api';
import { useLocation, useNavigate } from 'react-router-dom';


function Setprofile() {
    const [imageKeys, setImageKeys] = useState([]);
    const profileImg = useRef();
    const inputValueRef = useRef();
    const nicknameRef = useRef();
    const descriptionRef = useRef();
    const location = useLocation();
    const navigate = useNavigate()

    const setprofileImg = async (e)=>{
        const selectedfiles = e.target.files[0];
        const newImageKeys = [];
        if(selectedfiles){
            try{
                const data = await api.bucket.media([selectedfiles])
                newImageKeys.push(data.image_keys)
                setImageKeys([...newImageKeys])
            }
            catch(err){
                console.log(err)
            }
        }
    }

    function deleteImage (){
        const empthImageKeys = []
        if(imageKeys.length !== 0 ){
            setImageKeys([...empthImageKeys])
            inputValueRef.current.value = ''
        }
    }

    async function submitProfile (){
        if(inputValueRef.current.value && nicknameRef.current.value && descriptionRef.current.value !== ''){
            let userInfo = {
                nickname : nicknameRef.current.value,
                description : descriptionRef.current.value,
            }
            if(imageKeys.length !== 0){
                userInfo.image_key = imageKeys[0][0]
            }
            try{
                await api.account.editProfile(userInfo)
                if(location.pathname === '/setting/'){
                    navigate('/home/')
                }
                else {
                    navigate(`/profile/user?nickname=${nicknameRef.current.value}`)
                }
            }
            catch(error){
                console.log(error)
            }
        }
    }
    useEffect(()=>{
    },[imageKeys])

    return (
        <>
        <Toparea/>
            <article className='main-area'>
                <div className="default-header">
                        <h1>PROFILE🍑</h1>
                        <h3>나중에 언제든지 변경할 수 있습니다</h3>
                </div>

                <div className="image-select">
                    <label htmlFor="profile-img"><img src={imageKeys.length === 0 ? "../../img/profile.png" :`http://3.37.239.49/api/v1/bucket/media/?key=${imageKeys}` }alt="profile-img" id="profile-img-renderer" className={imageKeys.length !== 0 ? 'border50' : ''} ref={profileImg}/></label>
                    <input type="file" name="profile-img" id="profile-img" accept="image/*" onChange={setprofileImg} ref={inputValueRef}/>
                    {
                        imageKeys.length > 0 ?                    <div className='delete-image' onClick={deleteImage}>
                        <i></i>
                        <i></i>
                        </div> :
                        ''
                    }
                </div>

                <div className="input-text">
                    <input type="text" placeholder="닉네임" id="nickname" ref={nicknameRef}/>
                    <p className="nick-warn">* 이미 사용중인 닉네임입니다.</p>
                    <input type="textarea" placeholder="소개" id="introduce" ref={descriptionRef}/>
                </div>
                <button className="submit-btn" onClick={submitProfile}>{location.pathname === '/setting/'? '시작하기' : '수정하기'}</button>
            </article>
        </>
    );
}

export default Setprofile;