import React, { useState, useEffect, useContext } from 'react'
import s from './Like.module.scss'
import { Heart, HeartFill } from 'react-bootstrap-icons'
import axios from 'axios'
import authHeader from '../../services/header'
import { AuthContext } from '../../context/AuthContext';

const API_URL = process.env.REACT_APP_API_URL

const Like = ({ id, post }) => {

    const { userId } = useContext(AuthContext)

    const [like, setLike] = useState(false)
    const [countLike, setCountLike] = useState(0)

    useEffect(() => {

        setCountLike(post.like.length)

        setLike(post.like.includes(userId))

    }, [post.like, userId])

    const plusLike = async () => {
        console.log(API_URL + '/api/post/like/' + id)
        try {
            const res = await axios.get(API_URL + '/api/post/like/' + id, {
                headers: {
                    ...authHeader()
                }
            })
            console.log(res)

            if (res.status === 200) {
                if (like) {
                    setCountLike(countLike - 1)
                }
                else {
                    setCountLike(countLike + 1)
                }
                setLike(!like)
            }

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div onClick={plusLike} className={s.like}>
            <i>
                {like
                    ? <HeartFill className={s.heartFill} />
                    : <Heart />
                }
            </i>
            <p>
                {
                    countLike
                }
            </p>
        </div>
    );
};
export default Like