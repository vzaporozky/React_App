import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { TodoItem } from "./TodoItem/TodoItem";
import { fetchTodos } from "../../store/TodoListSlice";
import { PageTemplate } from "../PageTemplate/PageTemplate";

export const TodoList = () => {
    const todos = useSelector((state) => state.todos.todos);
    const { status, error } = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    return (
        <div>
            <PageTemplate name="TodoList" status={status} error={error} />

            <ul>
                {todos.map((todo) => (
                    <TodoItem key={todo.id} {...todo} form={false} />
                ))}
            </ul>
        </div>
    );
};
