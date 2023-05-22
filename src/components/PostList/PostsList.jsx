import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchPosts } from "../../store/PostsSlice";
import { PostItem } from "./PostItem/PostItem";
import { PageTemplate } from "../PageTemplate/PageTemplate";
import FormPost from "../Form/FormPosts";
import { createNewPost } from "../../store/PostsSlice";

export const PostsList = () => {
    const posts = useSelector((state) => state.posts.posts);
    const { status, error } = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    const handlePostSubmission = (post) => dispatch(createNewPost(post));

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <div>
            <PageTemplate name="PostsList" status={status} error={error} />

            <FormPost onAddPost={handlePostSubmission} />

            <ul>
                {posts.map((post) => (
                    <PostItem
                        key={post.id}
                        title={post.title}
                        body={post.body}
                    />
                ))}
            </ul>
        </div>
    );
};
