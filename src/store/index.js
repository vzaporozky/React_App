import { configureStore } from "@reduxjs/toolkit";

import PostsReducer from "./PostsSlice.js";
import TodoReducer from "./TodoListSlice.js";
import UsersReducer from "./UserListSlice.js";
import UserIdReducer from "./UserIdSlice.js";
import UserPostsSlice from "./tabUserPostsSlice.js";
import UserAlbumsSlice from "./tabUserAlbumsSlice.js";
import UserTodoSlice from "./tabUserTodoSlice.js";

export const store = configureStore({
    reducer: {
        posts: PostsReducer,
        todos: TodoReducer,
        users: UsersReducer,
        user: UserIdReducer,
        userPosts: UserPostsSlice,
        userAlbums: UserAlbumsSlice,
        userTodos: UserTodoSlice,
    },
});
