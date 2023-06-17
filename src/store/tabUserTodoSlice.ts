import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchFunction } from "../fetchFunction";

import { TodosInterfaces, TodosState } from "../interfaces";

export const getTodosByUserId = createAsyncThunk<
    TodosState[],
    string | number,
    { rejectValue: string }
>("users/getTodosByUserId", async (id, { rejectWithValue }) => {
    return fetchFunction(
        `https://jsonplaceholder.typicode.com/users/${id}/todos`,
        rejectWithValue
    );
});

export const toggleStatusByUserId = createAsyncThunk<
    TodosState,
    { id: string | number; todosId: string | number },
    { rejectValue: string; state: { todos: TodosInterfaces } }
>(
    "todos/toggleStatus",
    async function ({ id, todosId }, { rejectWithValue, dispatch, getState }) {
        const todo = getState().todos.todos.find((todo) => todo.id === id);

        if (!todo) {
            return rejectWithValue("Todo is undefine ");
        }

        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}/todos/${todosId}`,
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
            return rejectWithValue(
                "Can't toggle status. Server error " + response.status
            );
        }
        dispatch(toggleComplete({ id }));
        return (await response.json()) as TodosState;
    }
);

export const deleteTodoByUserId = createAsyncThunk<
    TodosState,
    { id: string | number; todosId: string | number },
    { rejectValue: string; state: { todos: TodosInterfaces } }
>(
    "todos/deleteTodo",
    async function ({ id, todosId }, { rejectWithValue, dispatch }) {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}/todos/${todosId}`,
            {
                method: "DELETE",
            }
        );

        if (!response.ok) {
            return rejectWithValue("Can't toggle status. Server error.");
        }
        dispatch(removeTodo({ id }));

        return (await response.json()) as TodosState;
    }
);

const initialState: TodosInterfaces = {
    todos: [],
    status: null,
    error: null,
};

export const tabUserTodoSlice = createSlice({
    name: "userTodos",
    initialState,
    reducers: {
        toggleComplete(state, action) {
            const toggledTodo = state.todos.find(
                (todo) => todo.id === action.payload.id
            );
            if (toggledTodo) toggledTodo.completed = !toggledTodo.completed;
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(
                (todo) => todo.id !== action.payload.id
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTodosByUserId.pending, (state) => {
                state.status = "Loading";
                state.error = null;
            })
            .addCase(getTodosByUserId.fulfilled, (state, action) => {
                state.status = "resolved";
                state.todos = action.payload;
            })
            .addCase(getTodosByUserId.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload;
            })
            .addCase(deleteTodoByUserId.pending, (state) => {
                state.status = "Loading";
                state.error = null;
            })
            .addCase(deleteTodoByUserId.fulfilled, (state, action) => {
                state.status = "resolved";
            })
            .addCase(deleteTodoByUserId.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload;
            })
            .addCase(toggleStatusByUserId.pending, (state) => {
                state.status = "Loading";
                state.error = null;
            })
            .addCase(toggleStatusByUserId.fulfilled, (state, action) => {
                state.status = "resolved";
            })
            .addCase(toggleStatusByUserId.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload;
            });
    },
});

const { toggleComplete, removeTodo } = tabUserTodoSlice.actions;

export default tabUserTodoSlice.reducer;
