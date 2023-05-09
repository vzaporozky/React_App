import cl from "./PostItem.module.css";

export const PostItem = ({ title, body }) => {
    return (
        <li className={cl.post}>
            <p>{title}</p>
            <p>{body}</p>
        </li>
    );
};
