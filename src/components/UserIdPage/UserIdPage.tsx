import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../features/hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faUser,
    faPhone,
    faHouse,
    faGlobe,
    faTruckFast,
} from "@fortawesome/free-solid-svg-icons";

import { getById } from "../../store/UserIdSlice";
import { getAlbumsByUserId } from "../../store/tabUserAlbumsSlice";
import { getTodosByUserId } from "../../store/tabUserTodoSlice";
import { getPostsByUserId } from "../../store/tabUserPostsSlice";

import { PageTemplate } from "../PageTemplate/PageTemplate";
import cl from "./UserIdPage.module.css";
import { TodoItem } from "../TodoList/TodoItem/TodoItem";

export const UserIdPage = () => {
    const { user, status, error } = useAppSelector((state) => state.user);
    const userPosts = useAppSelector((state) => state.userPosts.posts);
    const userAlbums = useAppSelector((state) => state.userAlbums.userAlbums);
    const userTodos = useAppSelector((state) => state.userTodos.todos);

    const PostsRef = useRef<HTMLButtonElement>(null);
    const AlbumsRef = useRef<HTMLButtonElement>(null);
    const TodosRef = useRef<HTMLButtonElement>(null);

    const dispatch = useAppDispatch();

    const params = useParams<{ id?: string }>();

    const [details, setDetails] = useState("Posts");

    const detailsPosts = (event: React.MouseEvent<HTMLButtonElement>) => {
        PostsRef.current!.id = "";
        AlbumsRef.current!.id = "";
        TodosRef.current!.id = "";
        event.currentTarget.id = cl.active;
        setDetails(event.currentTarget.innerHTML);
    };

    useEffect(() => {
        dispatch(getById(params.id || ""));
        dispatch(getAlbumsByUserId(params.id || ""));
        dispatch(getTodosByUserId(params.id || ""));
        dispatch(getPostsByUserId(params.id || ""));
    }, [dispatch, params.id]);

    return (
        <div>
            <PageTemplate name="PostsList" status={status} error={error} />

            <h2>вы открыли страницу пользователя c ID = {params.id}</h2>

            <div className={cl.listMain}>
                <ul className={cl.list}>
                    {user && user.address && (
                        <>
                            <li className={cl.item}>
                                <FontAwesomeIcon icon={faUser} />
                                <span>
                                    <p>name</p>
                                    {user.name + " " + user.username}
                                </span>
                            </li>
                            <li className={cl.item}>
                                <FontAwesomeIcon icon={faEnvelope} />
                                <span>
                                    <p>email</p>
                                    {user.email}
                                </span>
                            </li>
                            <li className={cl.item}>
                                <FontAwesomeIcon icon={faPhone} />
                                <span>
                                    <p>phone</p>
                                    {user.phone}
                                </span>
                            </li>
                        </>
                    )}
                </ul>
                <ul className={cl.list}>
                    {user && user.address && (
                        <>
                            <li className={cl.item}>
                                <FontAwesomeIcon icon={faHouse} />
                                <span>
                                    <p>address</p>
                                    {user.address.city +
                                        " " +
                                        user.address.street +
                                        " " +
                                        user.address.suite}
                                </span>
                            </li>
                            <li className={cl.item}>
                                <FontAwesomeIcon icon={faGlobe} />
                                <span>
                                    <p>website</p>
                                    {user.website}
                                </span>
                            </li>
                            <li className={cl.item}>
                                <FontAwesomeIcon icon={faTruckFast} />
                                <span>
                                    <p>company name</p>
                                    {user.company.name}
                                </span>
                            </li>
                        </>
                    )}
                </ul>
            </div>

            <div className={cl.userDetails}>
                <div className={cl.userButtons}>
                    <button
                        ref={PostsRef}
                        className={cl.userButton}
                        id={cl.active}
                        onClick={detailsPosts}
                    >
                        Posts
                    </button>
                    <button
                        ref={AlbumsRef}
                        className={cl.userButton}
                        onClick={detailsPosts}
                    >
                        Album
                    </button>
                    <button
                        ref={TodosRef}
                        className={cl.userButton}
                        onClick={detailsPosts}
                    >
                        Todos
                    </button>
                </div>
                <ul className={cl.userList}>
                    {details === "Posts" &&
                        userPosts.map((userPost) => (
                            <li key={userPost.id} className={cl.list__item}>
                                <p className={cl.item__title}>
                                    {userPost.title}
                                </p>
                                <p>{userPost.body}</p>
                            </li>
                        ))}
                    {details === "Album" &&
                        userAlbums.map((userAlbum) => (
                            <li key={userAlbum.id} className={cl.list__item}>
                                {userAlbum.title}
                            </li>
                        ))}
                    {details === "Todos" &&
                        userTodos.map((userTodo) => {
                            // console.log(userTodo);
                            return (
                                <TodoItem
                                    key={userTodo.id}
                                    id={userTodo.todosId}
                                    todosId={userTodo.id}
                                    title={userTodo.title}
                                    completed={userTodo.completed}
                                    form={true}
                                />
                            );
                        })}
                </ul>
            </div>
        </div>
    );
};
