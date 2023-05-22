import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchFunction } from "../fetchFunction";

export const getAlbumsByUserId = createAsyncThunk(
    "users/getAlbumsByUserId",
    async (id, { rejectWithValue }) => {
        return fetchFunction(
            `https://jsonplaceholder.typicode.com/users/${id}/albums`,
            rejectWithValue
        );
    }
);

export const tabUserAlbumSlice = createSlice({
    name: "userAlbums",
    initialState: {
        userAlbums: [],
        status: null,
        error: null,
    },
    extraReducers: {
        [getAlbumsByUserId.pending]: (state, action) => {
            state.status = "Loading";
            state.error = null;
        },
        [getAlbumsByUserId.fulfilled]: (state, action) => {
            state.status = "resolved";
            state.userAlbums = action.payload;
        },
        [getAlbumsByUserId.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        },
    },
});

export default tabUserAlbumSlice.reducer;
