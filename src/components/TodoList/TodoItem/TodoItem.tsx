import { useAppDispatch } from "../../../features/hook";
import { TodoItemState } from "../../../interfaces";

import { toggleStatus, deleteTodo } from "../../../store/TodoListSlice";
import {
    toggleStatusByUserId,
    deleteTodoByUserId,
} from "../../../store/tabUserTodoSlice";

import cl from "./TodoItem.module.css";

export const TodoItem: React.FC<TodoItemState> = ({
    id,
    title,
    completed,
    form,
    todosId,
}) => {
    const dispatch = useAppDispatch();

    const onChange = () => {
        if (form) {
            dispatch(toggleStatusByUserId({ id, todosId }));
        } else {
            dispatch(toggleStatus(id));
        }
    };

    const onClick = () => {
        if (form) {
            dispatch(deleteTodoByUserId({ id, todosId }));
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
