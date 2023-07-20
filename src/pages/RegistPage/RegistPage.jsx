import React, { useState } from 'react'
import s from './RegistPage.module.scss'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

const API_URL = process.env.REACT_APP_API_URL
const YOUR_CLIENT_ID = process.env.REACT_APP_CLIENT_ID

const RegistPage = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState({
        login: '',
        name: '',
        password: '',
    })

    const [error, setError] = useState('')

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const onSubmit = async () => {
        try {
            await axios.post(API_URL + '/api/auth/registration', user)
                .then((res) => {
                    console.log(res.data)
                    navigate('/login')
                })
        } catch (error) {
            console.log(error)
            setError(error.response.data.msg)
        }
    }


    // Auth Google Account
    const onSuccess = async (res) => {
        const { email, googleId, name } = res.profileObj;

        const googleUser = {
            name: name,
            password: googleId,
            login: email,
        }

        try {
            await axios.post(API_URL + '/api/auth/registration', googleUser)
                .then((res) => {
                    console.log(res.data)
                    navigate('/login')
                })
        } catch (error) {
            console.log(error)
            setError(error.response.data.msg)
        }

        console.log(res.profileObj)
    };
    const onFailure = (res) => {
        console.log(res);
    };

    return (
        <div className={s.main}>
            <div className={s.window}>
                <h2>Регистрация</h2>
                <div className={s.inputs}>
                    <input
                        placeholder='Придумайте login:'
                        onChange={onChange}
                        value={user.login}
                        name='login' type="text" />
                    <input
                        placeholder='Введите свое имя:'
                        onChange={onChange}
                        value={user.name}
                        name='name'
                        type="text" />
                    <input
                        placeholder='Придумайте пароль:'
                        onChange={onChange}
                        value={user.password}
                        name='password'
                        type="password" />
                </div>
                <h3 className={s.error}>
                    {error}
                </h3>
                <div className={s.navigate_btns}>
                    <Link className={s.link} to='/login'>Уже есть аккаунт?</Link>
                    <button onClick={onSubmit} className={s.btn}>Зарегистрироваться</button>
                    <GoogleLogin
                        clientId={YOUR_CLIENT_ID}
                        buttonText="Зарегистрироваться через Google"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                    // render={renderProps => (
                    //     <button className={s.google_btn} onClick={renderProps.onClick} type="empty">
                    //         Зарегистрироваться через Google
                    //     </button>
                    // )}
                    />
                </div>
            </div>
        </div>
    );
};
export default RegistPage