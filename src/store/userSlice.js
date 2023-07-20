import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import authHeader from '../services/header';
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

const initialState = {
    posts: [],
    loading: false,
    messege: null,
}

export const getUsers = createAsyncThunk(
    'users/getPosts',
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(API_URL + '/api/users')
            thunkAPI.dispatch(setUsers(res.data))

        } catch (error) {
            console.log(error)
        }
    }
)

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload
        }
    }
})

export const { setUsers } = userSlice.actions

export default userSlice.reducer