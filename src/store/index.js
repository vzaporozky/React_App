import { configureStore } from "@reduxjs/toolkit";

import PostsReducer from "./PostsSlice.js";
import TodoReducer from "./TodoListSlice.js";
import UsersReducer from "./UserListSlice.js";

export const store = configureStore({
    reducer: {
        posts: PostsReducer,
        todos: TodoReducer,
        users: UsersReducer,
    },
});
