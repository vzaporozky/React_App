import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { fetchFunction } from "../fetchFunction";

import { PostsInterfaces, PostsState } from "../interfaces";

export const fetchPosts = createAsyncThunk<
    PostsState[],
    undefined,
    { rejectValue: string }
>("posts/fetchPosts", async (_, { rejectWithValue }) => {
    return fetchFunction(
        "https://jsonplaceholder.typicode.com/posts?_limit=5",
        rejectWithValue
    );
});

export const createNewPost = createAsyncThunk<
    PostsState,
    Omit<PostsState, "id">,
    { rejectValue: string }
>("posts/createNewPost", async (postValues, { rejectWithValue, dispatch }) => {
    const post: Omit<PostsState, "id"> = {
        title: postValues.title,
        body: postValues.body,
        postId: 1,
    };
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    });

    if (!response.ok) {
        return rejectWithValue(
            "Can't add Post. Server error " + response.status
        );
    }

    const data = await response.json();
    dispatch(addNewTodo(data));

    return data;
});

const initialState: PostsInterfaces = {
    posts: [],
    status: null,
    error: null,
};

export const PostsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addNewTodo(state, action: PayloadAction<any>) {
            state.posts = [...state.posts, action.payload];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = "Loading";
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "resolved";
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload;
            })
            .addCase(createNewPost.pending, (state) => {
                state.status = "Loading";
                state.error = null;
            })
            .addCase(createNewPost.fulfilled, (state, action) => {
                state.status = "resolved";
            })
            .addCase(createNewPost.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload;
            });
    },
});

const { addNewTodo } = PostsSlice.actions;

export default PostsSlice.reducer;
