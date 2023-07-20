import React, { useEffect } from 'react'
import { getPosts } from '../../store/postSlice'
import { useDispatch, useSelector } from 'react-redux'
import Postsitem from '../../components/PostsItem/PostsItem';

const News = () => {

    const dispatch = useDispatch()
    const { posts } = useSelector((state) => state.posts)

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])

    return (
        <Postsitem posts={posts} />
    );
};
export default News