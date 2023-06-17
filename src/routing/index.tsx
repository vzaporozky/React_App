import { createBrowserRouter } from "react-router-dom";

import { Home } from "../components/Home";
import { TodoList } from "../components/TodoList/TodoList";
import { UserList } from "../components/UserList/UserList";
import { PostsList } from "../components/PostList/PostsList";
import { UserIdPage } from "../components/UserIdPage/UserIdPage";

export const router = createBrowserRouter([
    {
        path: "/",
        // exact: true,
        element: <Home />,
    },
    {
        path: "/PostsList",
        // exact: true,
        element: <PostsList />,
    },
    {
        path: "/TodoList",
        // exact: true,
        element: <TodoList />,
    },
    {
        path: "/UserList",
        // exact: true,
        element: <UserList />,
    },
    {
        path: "/UserList/:id",
        // exact: true,
        element: <UserIdPage />,
    },
]);
