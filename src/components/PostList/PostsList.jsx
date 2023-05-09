import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchPosts } from "../../store/PostsSlice";
import { PostItem } from "./PostItem/PostItem";
import { PageTemplate } from "../PageTemplate/PageTemplate";

export const PostsList = () => {
    const posts = useSelector((state) => state.posts.posts);
    const { status, error } = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <div>
            <PageTemplate name="PostsList" status={status} error={error} />

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
