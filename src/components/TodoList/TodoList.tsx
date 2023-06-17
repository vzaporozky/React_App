import React, { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../../features/hook";

import { TodoItem } from "./TodoItem/TodoItem";
import { fetchTodos } from "../../store/TodoListSlice";
import { PageTemplate } from "../PageTemplate/PageTemplate";

export const TodoList = () => {
    const todos = useAppSelector((state) => state.todos.todos);
    const { status, error } = useAppSelector((state) => state.todos);
    const dispatch = useAppDispatch();

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
