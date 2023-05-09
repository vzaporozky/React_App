import { useDispatch } from "react-redux";

import { toggleStatus, deleteTodo } from "../../../store/TodoListSlice";
import cl from "./TodoItem.module.css";

export const TodoItem = ({ id, title, completed }) => {
    const dispatch = useDispatch();

    return (
        <li className={cl.todo}>
            <input
                type="checkbox"
                checked={completed}
                onChange={() => dispatch(toggleStatus(id))}
            />
            <span>{title}</span>
            <span
                className={cl.delete}
                onClick={() => dispatch(deleteTodo(id))}
            >
                &times;
            </span>
        </li>
    );
};
