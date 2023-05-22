import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchFunction } from "../fetchFunction";

export const getById = createAsyncThunk(
    "users/getById",
    async (id, { rejectWithValue }) => {
        return fetchFunction(
            `https://jsonplaceholder.typicode.com/users/${id}`,
            rejectWithValue
        );
    }
);

export const UserIdSlice = createSlice({
    name: "user",
    initialState: {
        user: {},
        status: null,
        error: null,
    },
    extraReducers: {
        [getById.pending]: (state, action) => {
            state.status = "Loading";
            state.error = null;
        },
        [getById.fulfilled]: (state, action) => {
            state.status = "resolved";
            state.user = action.payload;
        },
        [getById.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        },
    },
});

export default UserIdSlice.reducer;
