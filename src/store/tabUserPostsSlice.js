import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchFunction } from "../fetchFunction";

export const getPostsByUserId = createAsyncThunk(
    "users/getPostsByUserId",
    async (id, { rejectWithValue }) => {
        return fetchFunction(
            `https://jsonplaceholder.typicode.com/users/${id}/posts`,
            rejectWithValue
        );
    }
);

export const tabUserPostsSlice = createSlice({
    name: "userPosts",
    initialState: {
        userPosts: [],
        status: null,
        error: null,
    },
    extraReducers: {
        [getPostsByUserId.pending]: (state, action) => {
            state.status = "Loading";
            state.error = null;
        },
        [getPostsByUserId.fulfilled]: (state, action) => {
            state.status = "resolved";
            state.userPosts = action.payload;
        },
        [getPostsByUserId.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        },
    },
});

export default tabUserPostsSlice.reducer;
