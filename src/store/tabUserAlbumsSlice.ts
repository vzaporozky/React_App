import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchFunction } from "../fetchFunction";

import { AlbumInterfaces, AlbumState } from "../interfaces";

export const getAlbumsByUserId = createAsyncThunk<
    AlbumState[],
    string,
    { rejectValue: string }
>("users/getAlbumsByUserId", async (id, { rejectWithValue }) => {
    return fetchFunction(
        `https://jsonplaceholder.typicode.com/users/${id}/albums`,
        rejectWithValue
    );
});

const initialState: AlbumInterfaces = {
    userAlbums: [],
    status: null,
    error: null,
};

export const tabUserAlbumSlice = createSlice({
    name: "userAlbums",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAlbumsByUserId.pending, (state) => {
                state.status = "Loading";
                state.error = null;
            })
            .addCase(getAlbumsByUserId.fulfilled, (state, action) => {
                state.status = "resolved";
                state.userAlbums = action.payload;
            })
            .addCase(getAlbumsByUserId.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload;
            });
    },
});

export default tabUserAlbumSlice.reducer;
