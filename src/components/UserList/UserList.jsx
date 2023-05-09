import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { UserItem } from "./UserItem/UserItem";
import { fetchUsers } from "../../store/UserListSlice";
import { PageTemplate } from "../PageTemplate/PageTemplate";

export const UserList = () => {
    const users = useSelector((state) => state.users.users);
    const { status, error } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <div>
            <PageTemplate name="UserList" status={status} error={error} />

            <ul>
                {users.map((user) => (
                    <UserItem key={user.id} {...user} />
                ))}
            </ul>
        </div>
    );
};
