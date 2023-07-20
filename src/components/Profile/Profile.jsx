import React, { useEffect } from 'react'
import s from './Profile.module.scss'
import { Images, PeopleFill, PersonHearts } from 'react-bootstrap-icons'
// import user_img from '../../assets/img/User-Avatar-Profile-PNG-Isolated-Transparent.png'
// import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../../store/profileSlice'
import { getUserPosts } from '../../store/postSlice'
import Postsitem from '../PostsItem/PostsItem'

const Profile = () => {

    const API_URL = process.env.REACT_APP_IMG_URL

    const userId = useParams().id
    const dispatch = useDispatch()
    const { profile } = useSelector(state => state.profile)
    const { posts } = useSelector((state) => state.posts)

    console.log(profile)

    useEffect(() => {
        dispatch(getProfile(userId))
        dispatch(getUserPosts(userId))
    }, [dispatch, userId])

    return (
        <section className={s.profile}>
            <div className={s.user}>
                <div className={s.info}>
                    <div className={s.avatar}>
                        <img src={API_URL + profile.avatar} alt="" />
                    </div>
                    <div className={s.statistic}>
                        <ul>
                            <li><Images /><span>Посты</span></li>
                            <li><PeopleFill /><span>Читатели</span></li>
                            <li><PersonHearts /><span>Подписки</span></li>
                        </ul>
                    </div>
                </div>
                <div className={s.description}>
                    <h2 className={s.name}>
                        {profile.name}
                    </h2>
                </div>
            </div>
            <Postsitem posts={posts} />
        </section>
    );
};
export default Profile