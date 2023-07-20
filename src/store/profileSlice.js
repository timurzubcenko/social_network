import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import authHeader from '../services/header';
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

const initialState = {
    profile: {},
    loading: false,
    messege: null,
}

export const getProfile = createAsyncThunk(
    'profile/getProfile',
    async (id, thunkAPI) => {
        try {
            const res = await axios.get(API_URL + '/api/profile/' + id)
            thunkAPI.dispatch(setProfile(res.data))

        } catch (error) {
            console.log(error)
        }
    }
)


const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload
        }
    }
})

export const { setProfile } = profileSlice.actions

export default profileSlice.reducer