import React from "react";
import { Link } from "react-router-dom";

import cl from "./UserItem.module.css";

import { UserItemState } from "../../../interfaces";

export const UserItem: React.FC<UserItemState> = ({ name, username, id }) => {
    return (
        <li className={cl.user}>
            {name} {username}
            <Link to={`/UserList/${id}`} className={cl.link}>
                React more
            </Link>
        </li>
    );
};
