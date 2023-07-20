import React, { useState, } from 'react'
import s from './Comment.module.scss'
import { useDispatch } from 'react-redux'
import { getAddComment } from '../../store/postSlice'

const Comment = ({ id, comments, showComment, countComments, setCountComments }) => {

    const dispatch = useDispatch()

    const [input, setInput] = useState('')

    const postComment = async () => {
        dispatch(getAddComment({ id, comment: input }))
        setCountComments(countComments + 1)
        setInput('')
    }

    return (
        <div className={`${s.comment_component} ${showComment ? s.active : ''}`}>
            <div className={s.comments}>
                {
                    comments.map((comment, index) =>
                        <div key={index} className={s.comment}>
                            <h3 className={s.name}>
                                {comment.login}
                            </h3>
                            <p>{comment.comment}</p>
                        </div>
                    )
                }
            </div>
            <div className={s.elements}>
                <input
                    type="text"
                    placeholder='Добавте коментарий'
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                />
                <button className={s.btn} onClick={postComment}>Добавить</button>
            </div>
        </div>
    );
};
export default Comment