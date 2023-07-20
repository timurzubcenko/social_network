import React, { useState, useEffect, useContext } from 'react'
// import Postsitem from '../../components/PostsItem/PostsItem';
import SideBar from '../../components/SideBar/SideBar';
import s from './MainPage.module.scss'
import UsersItem from '../../components/UsersItem/UsersItem';
import { useDispatch, useSelector } from 'react-redux'
// import { getPosts } from '../../store/postSlice'
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import authHeader from '../../services/header';
import Profile from '../../components/Profile/Profile';
import { Route, Routes } from 'react-router-dom';
import News from '../../components/News/News';

const API_URL = process.env.REACT_APP_API_URL

const MainPage = () => {

    const { logout } = useContext(AuthContext)

    const [visiblePopUp, setVisiblePopUp] = useState(false)

    const dispatch = useDispatch()
    const { posts } = useSelector((state) => state.posts)

    useEffect(() => {
        axios.get(API_URL + '/api/auth/', {
            headers: {
                ...authHeader()
            }
        })
            .then(res => { })
            .catch(err => {
                console.log(err.response.status)
                alert('Время авторизации истекло')
                logout()
            })
    }, [dispatch, logout])

    return (
        <div className='container'>
            <div className={s.main}>
                <SideBar visiblePopUp={visiblePopUp} setVisiblePopUp={setVisiblePopUp} posts={posts} />
                <Routes>
                    <Route path='/' element={<News />} />
                    <Route path="/profile/:id" element={<Profile />} />
                    <Route path='/users/*' element={<UsersItem />} />
                    <Route path='/main/users/profile/' element={<Profile />} />
                </Routes>
            </div>
        </div>
    );
};
export default MainPage