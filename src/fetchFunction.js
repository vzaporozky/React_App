// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { removeTodo, toggleComplete } from "./store/TodoListSlice";

export const fetchFunction = async (url, rejectWithValue) => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(response.status);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
};

// export const getById = async (url, rejectWithValue) => {
//     try {
//         const response = await fetch(url);

//         if (!response.ok) {
//             throw new Error(response.status);
//         }

//         const data = await response.json();
//         return data;
//     } catch (error) {
//         return rejectWithValue(error.message);
//     }
// };

// export const createAsyncOperation = (
//     type,
//     url,
//     method,
//     body = null,
//     customErrorMessage = null
// ) => {
//     return createAsyncThunk(
//         type,
//         async (_, { rejectWithValue, dispatch, getState }) => {
//             try {
//                 let requestConfig = {
//                     method: method,
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 };
//                 if (method === "POST" || method === "PUT") {
//                     requestConfig = {
//                         ...requestConfig,
//                         body: JSON.stringify(body),
//                     };
//                 }

//                 const response = await fetch(url, requestConfig);

//                 if (!response.ok) {
//                     const errorMessage =
//                         customErrorMessage ||
//                         `Can't ${
//                             method === "DELETE" ? "delete" : "toggle status of"
//                         } ${type}. Server error ${response.status}`;
//                     throw new Error(errorMessage);
//                 }

//                 if (method === "GET") {
//                     const data = await response.json();
//                     return data;
//                 }

//                 const todoId = getState().todos.todos.find(
//                     (todo) => todo.id === body.id
//                 ).id;

//                 dispatch(
//                     method === "DELETE"
//                         ? removeTodo({ id: todoId })
//                         : toggleComplete({ id: todoId })
//                 );
//             } catch (error) {
//                 return rejectWithValue(error.message);
//             }
//         }
//     );
// };
