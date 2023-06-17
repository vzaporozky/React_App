import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Users, UsersState } from "../interfaces";

import { fetchFunction } from "../fetchFunction";

export const fetchUsers = createAsyncThunk<
    Users[],
    undefined,
    { rejectValue: string }
>("users/fetchUsers", async (_, { rejectWithValue }) => {
    try {
        const response = await fetchFunction(
            "https://jsonplaceholder.typicode.com/users?_limit=20",
            ""
        );
        return response as Users[];
    } catch (error) {
        return rejectWithValue("Error fetching users!");
    }
});

const initialState: UsersState = {
    users: [],
    status: null,
    error: null,
};

export const UsersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = "Loading";
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = "resolved";
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload;
            });
    },
});

export default UsersSlice.reducer;
