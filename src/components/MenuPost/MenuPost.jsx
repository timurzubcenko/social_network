import React, { useContext } from 'react'
import s from './MenuPost.module.scss'
import { useDispatch } from 'react-redux'
import { deletePost } from '../../store/postSlice'
import { AuthContext } from '../../context/AuthContext';

const MenuPost = ({ post, menu, setMenu }) => {

    const dispatch = useDispatch()
    const { userId } = useContext(AuthContext)

    if (menu) {
        return (
            <div className={s.menu}>
                <ul>{
                    post.userId === userId
                        ? <li onClick={() => { dispatch(deletePost(post._id)) }} className={s.remove_btn}><p>Удалить</p></li>
                        : ''
                }
                    <li className={s.close_btn} onClick={() => { setMenu(false) }} ><p>Закрыть</p></li>
                </ul>
            </div>
        );
    }
};
export default MenuPost