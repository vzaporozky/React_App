import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchFunction } from "../fetchFunction";

export const fetchPosts = createAsyncThunk(
    "posts/fetchPosts",
    async (_, { rejectWithValue }) => {
        return fetchFunction(
            "https://jsonplaceholder.typicode.com/posts?_limit=20",
            rejectWithValue
        );
    }
);

export const PostsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        status: null,
        error: null,
    },
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.status = "Loading";
            state.error = null;
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = "resolved";
            state.posts = action.payload;
        },
        [fetchPosts.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        },
    },
});

export const { increment } = PostsSlice.actions;

export default PostsSlice.reducer;
