import React, { useEffect, useState } from 'react';
import './follow.scss'
import Toparea from '../../components/toparea';
import { Link, useLocation } from 'react-router-dom';
import api from '../../services/api';


function Followings(user) {
    const urlParams = new URLSearchParams(useLocation().search);
    const nickname = urlParams.get('nickname');

    const [followingList, setFollowingList] = useState(null)
    const [myFollowList, setMyFollowerList] = useState(null)
    const [followControll, setFollowControll] = useState(false)

    useEffect(()=>{
        async function following(){
            try{
                let following = await api.account.getFollowing(nickname)
                let myFollowList = await api.account.getFollowing(user.verfiyUser.nickname)
                setFollowingList(following)
                setMyFollowerList(myFollowList)
                setFollowControll(false)
            }
            catch (error){
                console.log(error)
            }
        }
        following()
    },[user , followControll])

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
        followingList !== null ?
        <>
            <div className="follower-wrapper">
                <Toparea/>
                {
                    followingList.map((a,i)=>{
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

export default Followings;