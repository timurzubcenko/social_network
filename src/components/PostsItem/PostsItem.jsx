import React from 'react'
import Post from '../Post/Post';
import s from './PostsItem.module.scss'

const Postsitem = ({ posts }) => {
    return (
        <div className={`${s.posts_item}`}>
            {
                posts.map((post, index) =>
                    <Post
                        post={post}
                        key={index} />
                )
            }
        </div>
    );
};
export default Postsitem