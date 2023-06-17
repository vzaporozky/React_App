import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchFunction } from "../fetchFunction";
import { PostsInterfaces, PostsState } from "../interfaces";

export const getPostsByUserId = createAsyncThunk<
    PostsState[],
    string,
    { rejectValue: string }
>("users/getPostsByUserId", async (id, { rejectWithValue }) => {
    return fetchFunction(
        `https://jsonplaceholder.typicode.com/users/${id}/posts`,
        rejectWithValue
    );
});

const initialState: PostsInterfaces = {
    posts: [],
    status: null,
    error: null,
};

export const tabUserPostsSlice = createSlice({
    name: "userPosts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPostsByUserId.pending, (state) => {
                state.status = "Loading";
                state.error = null;
            })
            .addCase(getPostsByUserId.fulfilled, (state, action) => {
                state.status = "resolved";
                state.posts = action.payload;
            })
            .addCase(getPostsByUserId.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload;
            });
    },
});

export default tabUserPostsSlice.reducer;
