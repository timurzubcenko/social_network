import React, { useState, useEffect } from 'react'
import s from './Post.module.scss'
import { ThreeDots, ChatLeft, ChatLeftDots } from 'react-bootstrap-icons'
import MenuPost from '../MenuPost/MenuPost';
import Like from '../Like/Like';
import Comment from '../Comment/Comment';
import userIMG from '../../assets/img/User-Avatar-Profile-PNG-Isolated-Transparent.png'

const API_URL = process.env.REACT_APP_API_URL

const Post = ({ post }) => {
    const API_URL_IMG = process.env.REACT_APP_IMG_URL

    const [menu, setMenu] = useState(false)
    const [countComments, setCountComments] = useState(0)

    useEffect(() => {
        setCountComments(post.comments.length)
        // console.log(post.comments)
    }, [post.comments.length])

    const showMenu = () => {
        setMenu(!menu)
    }

    const [showComment, setShowComment] = useState(false)

    const checkComment = () => {
        setShowComment(!showComment)
    }

    return (
        <div className={s.post}>
            <MenuPost post={post} menu={menu} setMenu={setMenu} />
            <div className={s.header}>
                <div className={s.user}>
                    <div className={s.image}>
                        <img src={API_URL_IMG + post.avatar} alt="" />
                    </div>
                    <h3 className={s.user_name}>{post.name}</h3>
                </div>
                <div onClick={showMenu} className={s.menu}>
                    <ThreeDots />
                </div>
            </div>
            <div className={s.picture}>
                <img src={API_URL + '/static/images/' + post.file} alt="" />
            </div>
            <div className={s.description}>
                <p>{post.text}</p>
            </div>
            <div className={s.btns}>
                <Like post={post} id={post._id} />
                <div onClick={checkComment} className={s.comment_btn}>
                    <i>
                        {
                            showComment
                                ? <ChatLeftDots />
                                : <ChatLeft />
                        }
                    </i>
                    <p>{countComments}</p>
                </div>
            </div>
            <Comment
                post={post}
                showComment={showComment}
                comments={post.comments} id={post._id}
                countComments={countComments}
                setCountComments={setCountComments} />
        </div>
    );
};
export default Post