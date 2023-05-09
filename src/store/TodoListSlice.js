import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchFunction } from "../fetchFunction";

export const fetchTodos = createAsyncThunk(
    "todos/fetchTodos",
    async (_, { rejectWithValue }) => {
        return fetchFunction(
            "https://jsonplaceholder.typicode.com/todos?_limit=20",
            rejectWithValue
        );
    }
);

export const toggleStatus = createAsyncThunk(
    "todos/toggleStatus",
    async (id, { rejectWithValue, dispatch, getState }) => {
        const todo = getState().todos.todos.find((todo) => todo.id === id);

        try {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/todos/${id}`,
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

export const deleteTodo = createAsyncThunk(
    "todos/deleteTodo",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/todos/${id}`,
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

const setError = (state, action) => {
    state.status = "rejected";
    state.error = action.payload;
};
const setLoading = (state, action) => {
    state.status = "Loading";
    state.error = null;
};

export const TodosSlice = createSlice({
    name: "todos",
    initialState: {
        todos: [],
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
        [fetchTodos.pending]: setLoading,
        [fetchTodos.fulfilled]: (state, action) => {
            state.status = "resolved";
            state.todos = action.payload;
        },
        [fetchTodos.rejected]: setError,
        [deleteTodo.pending]: setLoading,
        [deleteTodo.fulfilled]: (state, action) => {
            state.status = "resolved";
            // state.todos = action.payload;
        },
        [deleteTodo.rejected]: setError,
        [toggleStatus.pending]: setLoading,
        [toggleStatus.fulfilled]: (state, action) => {
            state.status = "resolved";
            // state.todos = action.payload;
        },
        [toggleStatus.rejected]: setError,
    },
});

export const { toggleComplete, removeTodo } = TodosSlice.actions;

export default TodosSlice.reducer;
