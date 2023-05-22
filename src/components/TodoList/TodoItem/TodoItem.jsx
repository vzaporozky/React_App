import { useDispatch } from "react-redux";

import { toggleStatus, deleteTodo } from "../../../store/TodoListSlice";
import {
    toggleStatusByUserId,
    deleteTodoByUserId,
} from "../../../store/tabUserTodoSlice";
import cl from "./TodoItem.module.css";

export const TodoItem = ({ id, title, completed, form, idTodo }) => {
    const dispatch = useDispatch();

    const onChange = () => {
        if (form) {
            dispatch(toggleStatusByUserId({ id, idTodo }));
        } else {
            dispatch(toggleStatus(id));
        }
    };

    const onClick = () => {
        if (form) {
            dispatch(deleteTodoByUserId({ id, idTodo }));
        } else {
            dispatch(deleteTodo(id));
        }
    };

    return (
        <li className={cl.todo}>
            <input
                type="checkbox"
                checked={completed}
                onChange={() => onChange()}
            />
            <span>{title}</span>
            <span className={cl.delete} onClick={onClick}>
                &times;
            </span>
        </li>
    );
};
