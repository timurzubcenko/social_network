import React, { useState, useContext } from 'react'
import s from './AddPost.module.scss'
import { Download } from 'react-bootstrap-icons'
import { AuthContext } from '../../context/AuthContext';
import { useDispatch } from 'react-redux'
import { getAddPost } from '../../store/postSlice'
import uploadImg from '../../services/upload.services';


const AddPost = ({ visiblePopUp, setVisiblePopUp }) => {

    const dispatch = useDispatch()

    const { name } = useContext(AuthContext)

    const [input, setInput] = useState('')
    const [file, setFile] = useState('')

    const [img, setImg] = useState('')

    const onInput = (e) => {
        setInput(e.target.value)
    }

    const onFile = async (e) => {
        const image = e.target.files[0]

        const res = await uploadImg(image, 720)
        console.log(res.data)
        setFile(res.data)
        fileReader.readAsDataURL(image)
    }

    const fileReader = new FileReader()
    fileReader.onloadend = () => {
        setImg(fileReader.result)
    }

    const addPost = () => {

        const newPost = { name: name, text: input, file: file }

        dispatch(getAddPost(newPost))
        setInput('')
        setFile('')
        setVisiblePopUp(!visiblePopUp)
    }

    if (visiblePopUp) {
        return (
            <div onClick={() => { setVisiblePopUp(false) }} className={s.main}>
                <div onClick={(e) => e.stopPropagation()} className={s.window}>
                    <textarea
                        onChange={onInput}
                        value={input}
                        className={s.discription}
                        type="text"
                        placeholder='Ведите текст:' />
                    <div className={s.block_file}>
                        <input
                            onChange={onFile}
                            vlaue={img}
                            className={s.file}
                            type="file" />
                        <div className={s.costume_file}>
                            <div className={s.btn}>
                                {
                                    file !== ''
                                        ? <img src={img} alt="" />
                                        : <Download />
                                }
                            </div>
                        </div>
                    </div>

                    <button className={s.btnAdd} onClick={addPost}>Отправить</button>
                </div>
            </div>
        );
    }
};
export default AddPost