import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchFunction } from "../fetchFunction";

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async (_, { rejectWithValue }) => {
        return fetchFunction(
            "https://jsonplaceholder.typicode.com/users?_limit=20",
            rejectWithValue
        );
    }
);

export const UsersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        status: null,
        error: null,
    },
    extraReducers: {
        [fetchUsers.pending]: (state, action) => {
            state.status = "Loading";
            state.error = null;
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.status = "resolved";
            state.users = action.payload;
        },
        [fetchUsers.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        },
    },
});

export default UsersSlice.reducer;
