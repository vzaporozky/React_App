import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchFunction } from "../fetchFunction";

export const getTodosByUserId = createAsyncThunk(
    "users/getTodosByUserId",
    async (id, { rejectWithValue }) => {
        return fetchFunction(
            `https://jsonplaceholder.typicode.com/users/${id}/todos`,
            rejectWithValue
        );
    }
);

export const toggleStatusByUserId = createAsyncThunk(
    "todos/toggleStatus",
    async ({ id, idTodo }, { rejectWithValue, dispatch, getState }) => {
        const todo = getState().todos.todos.find((todo) => todo.id === id);

        try {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/users/${id}/todos/${idTodo}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        completed: !todo.completed,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Can't toggle status. Server error " + response.status
                );
            }
            dispatch(toggleComplete({ id }));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteTodoByUserId = createAsyncThunk(
    "todos/deleteTodo",
    async ({ id, idTodo }, { rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/users/${id}/todos/${idTodo}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Can't delete task. Server error " + response.status
                );
            }
            dispatch(removeTodo({ id }));
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
    // state.posts = action.payload;
};
const setError = (state, action) => {
    state.status = "rejected";
    state.error = action.payload;
};

export const tabUserTodoSlice = createSlice({
    name: "userTodos",
    initialState: {
        userTodos: [],
        status: null,
        error: null,
    },
    reducers: {
        toggleComplete(state, action) {
            const toggledTodo = state.todos.find(
                (todo) => todo.id === action.payload.id
            );
            toggledTodo.completed = !toggledTodo.completed;
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(
                (todo) => todo.id !== action.payload.id
            );
        },
    },
    extraReducers: {
        [getTodosByUserId.pending]: setLoading,
        [getTodosByUserId.fulfilled]: (state, action) => {
            state.status = "resolved";
            state.userTodos = action.payload;
        },
        [getTodosByUserId.rejected]: setError,
        [deleteTodoByUserId.pending]: setLoading,
        [deleteTodoByUserId.fulfilled]: setValue,
        [deleteTodoByUserId.rejected]: setError,
        [toggleStatusByUserId.pending]: setLoading,
        [toggleStatusByUserId.fulfilled]: setValue,
        [toggleStatusByUserId.rejected]: setError,
    },
});

const { toggleComplete, removeTodo } = tabUserTodoSlice.actions;

export default tabUserTodoSlice.reducer;
