import React from 'react'
import s from './Loading.module.css'

const Loading = () => {
    return (
        <div className={s.bg}>
            <div className={s.loader}>
                <div className={s.item1}></div>
                <div className={s.item2}></div>
                <div className={s.item3}></div>
            </div>
        </div>
    );
};
export default Loading