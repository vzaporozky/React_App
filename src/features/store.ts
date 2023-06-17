import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

import PostsReducer from "../store/PostsSlice";
import TodoReducer from "../store/TodoListSlice";
import UsersReducer from "../store/UserListSlice";
import UserIdReducer from "../store/UserIdSlice";
import UserPostsSlice from "../store/tabUserPostsSlice";
import UserAlbumsSlice from "../store/tabUserAlbumsSlice";
import UserTodoSlice from "../store/tabUserTodoSlice";

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

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
