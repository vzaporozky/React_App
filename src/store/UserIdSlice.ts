import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchFunction } from "../fetchFunction";

import { Users, UserState } from "../interfaces";

export const getById = createAsyncThunk<Users, string, { rejectValue: string }>(
    "users/getById",
    async (id, { rejectWithValue }) => {
        return fetchFunction(
            `https://jsonplaceholder.typicode.com/users/${id}`,
            rejectWithValue
        );
    }
);

const initialState: UserState = {
    user: {} as Users,
    status: null,
    error: null,
};

export const UserIdSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getById.pending, (state) => {
                state.status = "Loading";
                state.error = null;
            })
            .addCase(getById.fulfilled, (state, action) => {
                state.status = "resolved";
                state.user = action.payload;
            })
            .addCase(getById.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload;
            });
    },
});

export default UserIdSlice.reducer;
