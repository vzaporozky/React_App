import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchFunction } from "../fetchFunction";

export const fetchPosts = createAsyncThunk(
    "posts/fetchPosts",
    async (_, { rejectWithValue }) => {
        return fetchFunction(
            "https://jsonplaceholder.typicode.com/posts?_limit=5",
            rejectWithValue
        );
    }
);

export const createNewPost = createAsyncThunk(
    "posts/createNewPost",
    async (postValues, { rejectWithValue, dispatch }) => {
        try {
            const post = {
                title: postValues.title,
                body: postValues.body,
                userId: 1,
            };
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/posts`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(post),
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Can't add Post. Server error " + response.status
                );
            }

            const data = await response.json();
            dispatch(addNewTodo(data));

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const setLoading = (state, action) => {
    state.status = "Loading";
    state.error = null;
};
const setValue = (state, action) => {
    state.status = "resolved";
};
const setError = (state, action) => {
    state.status = "rejected";
    state.error = action.payload;
};

export const PostsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        status: null,
        error: null,
    },
    reducers: {
        addNewTodo(state, action) {
            state.posts.push(action.payload);
        },
    },
    extraReducers: {
        [fetchPosts.pending]: setLoading,
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = "resolved";
            state.posts = action.payload;
        },
        [fetchPosts.rejected]: setError,
        [createNewPost.pending]: setLoading,
        [createNewPost.fulfilled]: setValue,
        [createNewPost.rejected]: setError,
    },
});

const { addNewTodo } = PostsSlice.actions;

export default PostsSlice.reducer;
