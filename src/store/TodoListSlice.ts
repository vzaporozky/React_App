import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchFunction } from "../fetchFunction";

import { TodosState, TodosInterfaces } from "../interfaces";

export const fetchTodos = createAsyncThunk<
    TodosState[],
    undefined,
    { rejectValue: string }
>("todos/fetchTodos", async (_, { rejectWithValue }) => {
    return fetchFunction(
        "https://jsonplaceholder.typicode.com/todos?_limit=20",
        rejectWithValue
    );
});

export const toggleStatus = createAsyncThunk<
    TodosState,
    string | number,
    {
        rejectValue: string;
        state: { todos: TodosInterfaces };
    }
>(
    "todos/toggleStatus",
    async function (id, { rejectWithValue, dispatch, getState }) {
        const todo = getState().todos.todos.find((todo) => todo.id === id);

        if (!todo) {
            return rejectWithValue("Todo not found.");
        }
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
            return rejectWithValue("Can't toggle status. Server error.");
        }
        dispatch(toggleComplete({ id }));

        return (await response.json()) as TodosState;
    }
);

export const deleteTodo = createAsyncThunk<
    TodosState,
    string | number,
    { rejectValue: string }
>("todos/deleteTodo", async function (id, { rejectWithValue, dispatch }) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {
        return rejectWithValue("Can't toggle status. Server error.");
    }
    dispatch(removeTodo({ id }));

    return (await response.json()) as TodosState;
});

const initialState: TodosInterfaces = {
    todos: [],
    status: null,
    error: null,
};

export const TodosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        toggleComplete(state, action) {
            const toggledTodo = state.todos.find(
                (todo: TodosState) => todo.id === action.payload.id
            );
            if (toggledTodo) {
                toggledTodo.completed = !toggledTodo.completed;
            }
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(
                (todo: TodosState) => todo.id !== action.payload.id
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = "Loading";
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = "resolved";
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload;
            })
            .addCase(deleteTodo.pending, (state) => {
                state.status = "Loading";
                state.error = null;
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.status = "resolved";
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload;
            })
            .addCase(toggleStatus.pending, (state) => {
                state.status = "Loading";
                state.error = null;
            })
            .addCase(toggleStatus.fulfilled, (state, action) => {
                state.status = "resolved";
            })
            .addCase(toggleStatus.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload;
            });
    },
});

export const { toggleComplete, removeTodo } = TodosSlice.actions;

export default TodosSlice.reducer;
