import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './search.scss';
import Toparea from '../../components/toparea';
import Navbar from '../../components/navbar';
import api from '../../services/api';

function Searh() {
    const [searchUser, setSearchUser] = useState('');
    const [searchedUser, setSearchedUser] = useState([])
    useEffect(()=>{
        try{
            api.account.search(searchUser)
            .then((res)=>{
                setSearchedUser(res)
            })
        }
        catch(error){
            console.log(error)
        }
    },[searchUser])
    return (
        <>
        <div className="search-wrapper">
            <Toparea searchUser={searchUser} setSearchUser={setSearchUser}/>
            <section className="container search-result">
                {
                    searchedUser.map((user,i)=>{
                        // 유저가 검색한 색상 변경
                        let insertpoint = user.nickname.indexOf(searchUser);

                        let startingSlice = user.nickname.slice(0,insertpoint);

                        let insertLast = user.nickname.slice(insertpoint, user.nickname.length).replace(`${searchUser}`,'')
                        return(
                            searchUser.length === 0 || searchedUser.length === 0 ? '' 
                            :
                            <Link to={`/profile/user?nickname=${user.nickname}`} key={i}>        
                            <div className="searched-user" key={user.nickname}>
                                {
                                    user.image_url === null || ''?
                                    <img src="../img/peach_cha.png" alt="user-profile"/>:
                                    <img src={user.image_url} alt="user-profile"/>
                                }
                                <p className='searched-user-nick'>
                                {startingSlice}    
                                <span className='keyword'>{searchUser}</span>
                                {insertLast}</p>
                            </div>
                            </Link>
                        )
                    })
                }
            </section>
        </div>
            <Navbar/>
        </>
    );
}

export default Searh;