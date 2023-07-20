import React, { useContext, useEffect, useState } from 'react'
import s from './SideBar.module.scss'
import { House, Person, People, FileEarmarkPlusFill } from 'react-bootstrap-icons'
import AddPost from '../AddPost/AddPost';
import { AuthContext } from '../../context/AuthContext';
import userIMG from '../../assets/img/User-Avatar-Profile-PNG-Isolated-Transparent.png'
import { Link, useLocation } from 'react-router-dom'

const API_URL = process.env.REACT_APP_IMG_URL

const dataSideBar = [
    {
        title: 'Мой профиль',
        path: '/main/profile/',
        icon: <Person className={s.icon} />,
    },
    {
        title: 'Новости',
        path: '/main',
        icon: <House className={s.icon} />,
    },
    {
        title: 'Пользователи',
        path: '/main/users',
        icon: <People className={s.icon} />,
    },
]

const SideBar = ({ visiblePopUp, setVisiblePopUp, }) => {

    const [sideBar, setSideBar] = useState(dataSideBar)

    const path = useLocation().pathname

    const { name, userId, avatar } = useContext(AuthContext)

    const add = () => {
        setVisiblePopUp(!visiblePopUp)
    }

    useEffect(() => {

        setSideBar(dataSideBar.map((item) => {
            return item.path === '/main/profile/' ? { ...item, path: item.path + userId } : item
        }))

    }, [userId])


    return (
        <React.Fragment>
            <AddPost visiblePopUp={visiblePopUp} setVisiblePopUp={setVisiblePopUp} />
            <div className={s.side_bar}>
                <div className={s.userProfile} >
                    <div className={s.user}>
                        <div className={s.image}>
                            <img src={API_URL + avatar} alt="" />
                        </div>
                        <h3>{name}</h3>
                    </div>
                    <div onClick={add} className={s.btn}>
                        <FileEarmarkPlusFill className={s.icon} />
                    </div>
                </div>

                <ul className={s.btns}>
                    {sideBar.map((item, index) =>
                        <li key={index} className={`${s.btn} ${path === item.path ? s.active : ''}`}>
                            <Link className={s.link} to={item.path}>
                                {item.icon}
                                <p>{item.title}</p>
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </React.Fragment>
    );
};
export default SideBar