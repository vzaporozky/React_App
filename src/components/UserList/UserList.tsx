import React, { useEffect } from "react";

import { UserItem } from "./UserItem/UserItem";
import { fetchUsers } from "../../store/UserListSlice";
import { PageTemplate } from "../PageTemplate/PageTemplate";

import { useAppSelector, useAppDispatch } from "../../features/hook";

export const UserList = () => {
    const users = useAppSelector((state) => state.users.users);
    const { status, error } = useAppSelector((state) => state.users);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <div>
            <PageTemplate name="UserList" status={status} error={error} />

            <ul>
                {users.map((user) => (
                    <UserItem key={user.id} {...user} id={user.id} />
                ))}
            </ul>
        </div>
    );
};
