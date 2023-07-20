import React, { useEffect } from 'react'
import s from './UsersItem.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../store/userSlice';
import { Link } from 'react-router-dom';
// import userIMG from '../../assets/img/User-Avatar-Profile-PNG-Isolated-Transparent.png'


const UsersItem = () => {

    const API_URL = process.env.REACT_APP_IMG_URL

    const dispatch = useDispatch()
    const { users } = useSelector((state) => state.users)
    console.log(users)

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    return (
        <div className={`${s.users_item}`}>
            {users?.map((user, index) =>
                <Link className={s.user} key={index} to={"/main/profile/" + user._id}>
                    <div className={s.userItem}>
                        <div className={s.avatar}>
                            <img src={API_URL + user.avatar} alt="" />
                        </div>
                        <p>{user.name}</p>
                    </div>
                </Link>
            )}
        </div>
    );
};
export default UsersItem