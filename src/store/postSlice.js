import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authHeader from '../services/header';
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

const initialState = {
    posts: [],
    loading: false,
    messege: null,
}

export const getPosts = createAsyncThunk(
    'posts/getPosts',
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(API_URL + '/api/post')
            thunkAPI.dispatch(setPosts(res.data))

        } catch (error) {
            console.log(error)
        }
    }
)

export const getAddPost = createAsyncThunk(
    'posts/getAddPost',
    async (post, thunkAPI) => {
        try {

            const res = await axios.post(API_URL + '/api/post/', post, {
                headers: {
                    ...authHeader()
                }
            })

            thunkAPI.dispatch(addPost(res.data))


        } catch (error) {
            console.log(error)
        }
    }
)

export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async (id, thunkAPI) => {
        try {

            await axios.delete(API_URL + '/api/post/' + id, {
                headers: {
                    ...authHeader()
                }
            })
            thunkAPI.dispatch(removePost(id))

        } catch (error) {
            console.log(error)
        }
    }
)

export const getAddComment = createAsyncThunk(
    'posts/getAddComment',
    async ({ comment, id }, thunkAPI) => {
        try {

            const res = await axios.post(API_URL + '/api/post/comment/' + id, { comment }, {
                headers: {
                    ...authHeader()
                }
            })
            console.log(res)
            thunkAPI.dispatch(addComment({ id, comment: res.data }))

        } catch (error) {
            console.log(error)
        }
    }
)

export const getUserPosts = createAsyncThunk(
    'posts/getUserPosts',
    async (id, thunkAPI) => {
        try {
            const res = await axios.get(API_URL + '/api/post/posts/' + id, {
                headers: {
                    ...authHeader()
                }
            })
            console.log(res)
            thunkAPI.dispatch(setPosts(res.data))

        } catch (error) {
            console.log(error)
        }
    }
)

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload
        },

        addPost: (state, action) => {
            console.log(action.payload)
            state.posts = [action.payload, ...state.posts]
        },

        removePost: (state, action) => {

            state.posts = state.posts.filter(p => p._id !== action.payload)
            // setPosts(posts.filter(p => p._id !== id))
        },

        addComment: (state, action) => {
            const { id, comment } = action.payload
            state.posts = state.posts.map((post) => {
                if (post._id === id) {
                    post.comments.push(comment)
                }
                return post
            })
        },
    }
})

export const { setPosts, addPost, removePost, addComment, countComments } = postSlice.actions

export default postSlice.reducer