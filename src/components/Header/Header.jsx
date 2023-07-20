import React, { useContext } from 'react'
import s from './Header.module.scss'
import { AuthContext } from '../../context/AuthContext';

const Header = () => {

    const { isLogin, logout } = useContext(AuthContext)

    return (
        <header className={s.header}>
            <div className={`${s.in_header} container`}>
                {
                    isLogin
                        ? <h2>Social Network</h2>
                        : <h2>Social Network</h2>
                }
                {
                    isLogin
                        ? <button onClick={logout}>Выйти</button>
                        : ''
                }
            </div>
        </header>
    );
};
export default Header