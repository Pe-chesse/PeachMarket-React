import React, { useEffect, useState } from 'react';
import './follow.scss'
import { Link, useLocation } from 'react-router-dom';
import Toparea from '../../components/toparea';
import api from '../../services/api';


function Followers(user) {
    const urlParams = new URLSearchParams(useLocation().search);
    const nickname = urlParams.get('nickname');
    const [followerList, setFollowerList] = useState(null)
    const [myFollowList, setMyFollowerList] = useState(null)
    const [followControll, setFollowControll] = useState(false)
    // 팔로워 목록 리스트
    useEffect(()=>{
        async function follower (){
            try{
                let followList = await api.account.getFollow(nickname)
                let myFollowList = await api.account.getFollowing(user.verfiyUser.nickname)
                setFollowerList(followList)
                setMyFollowerList(myFollowList)
                setFollowControll(false)
            }
            catch(error){
                console.log(error)
            }
        }
        follower()
    },[user, followControll])

    function checkFollowing(nickname){
        if (myFollowList !== null) {
            for (let i = 0; i < myFollowList.length; i++) {
                if (myFollowList[i].nickname === nickname) {
                    return false;
                }
            }
        }
        return true; 
    }

    async function toggleFollow (nickname) {
        try{
            await api.account.setFollow(nickname)
            setFollowControll(true)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        followerList !== null ?
        <>
            <div className="follower-wrapper">
                <Toparea/>
                {
                    followerList.map((a,i)=>{
                        let checkFollow = checkFollowing(a.nickname)
                        return(
                        <div className="followers" key={a.nickname}>
                            <Link to={`/profile/user?nickname=${a.nickname}`}>
                                <div className='user-main-img'>
                                    <img src={a.image_url ? a.image_url : '../img/peach-user.png'}/>
                                </div>
                            </Link>
                            <div className="user-info">
                                <Link to={`/profile/user?nickname=${a.nickname}`}>
                                <h2>{a.nickname}</h2>
                                </Link>
                            </div>
                            {
                                user.verfiyUser.nickname === a.nickname ?
                                ''
                                :
                            <div className='followBtn'>
                                <button className={checkFollow ? 'follow' : 'cancle follow'} onClick={()=>{toggleFollow(a.nickname)}}>{checkFollow ? '팔로우' : '언팔로우'}</button>
                            </div>
                            }
                        </div>
                        )
                    })
                }
            </div>
        </>
        :''
    );
}

export default Followers;