import cl from "./UserItem.module.css";

export const UserItem = ({ name, username }) => {
    return (
        <li className={cl.user}>
            {name} {username}
        </li>
    );
};
