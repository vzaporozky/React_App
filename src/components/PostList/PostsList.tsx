import React, { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../../features/hook";

import { fetchPosts } from "../../store/PostsSlice";

import { PageTemplate } from "../PageTemplate/PageTemplate";
import { PostItem } from "./PostItem/PostItem";
import FormPost from "../Form/FormPosts";

export const PostsList = () => {
    const posts = useAppSelector((state) => state.posts.posts);
    const { status, error } = useAppSelector((state) => state.posts);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <div>
            <PageTemplate name="PostsList" status={status} error={error} />

            <FormPost />

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
