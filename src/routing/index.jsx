import { createBrowserRouter } from "react-router-dom";

import { Home } from "../components/Home";
import { TodoList } from "../components/TodoList/TodoList";
import { UserList } from "../components/UserList/UserList";
import { PostsList } from "../components/PostList/PostsList";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/PostsList",
        element: <PostsList />,
    },
    {
        path: "/TodoList",
        element: <TodoList />,
    },
    {
        path: "/UserList",
        element: <UserList />,
    },
]);
