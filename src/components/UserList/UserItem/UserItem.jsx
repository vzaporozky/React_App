import { Link } from "react-router-dom";

import cl from "./UserItem.module.css";

export const UserItem = ({ name, username, id }) => {
    return (
        <li className={cl.user}>
            {name} {username}
            <Link to={`/UserList/${id}`} className={cl.link}>
                React more
            </Link>
        </li>
    );
};
