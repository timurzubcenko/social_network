import { configureStore } from '@reduxjs/toolkit'
import postSlice from './postSlice'
import userSlice from './userSlice'
import profileSlice from './profileSlice'

export default configureStore({
    reducer: {
        posts: postSlice,
        users: userSlice,
        profile: profileSlice,
    }
})