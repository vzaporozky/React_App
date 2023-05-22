import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faUser,
    faPhone,
    faHouse,
    faGlobe,
    faTruckFast,
} from "@fortawesome/free-solid-svg-icons";

// import { Navigation } from "../Navigation/Navigation";
import { getById } from "../../store/UserIdSlice";
import { getAlbumsByUserId } from "../../store/tabUserAlbumsSlice";
import { getTodosByUserId } from "../../store/tabUserTodoSlice";
import { getPostsByUserId } from "../../store/tabUserPostsSlice";
import { toggleStatusByUserId } from "../../store/tabUserTodoSlice";

import { PageTemplate } from "../PageTemplate/PageTemplate";
import cl from "./UserIdPage.module.css";
import { TodoItem } from "./../TodoList/TodoItem/TodoItem";

export const UserIdPage = () => {
    const user = useSelector((state) => state.user.user);
    const userPosts = useSelector((state) => state.userPosts.userPosts);
    const userAlbums = useSelector((state) => state.userAlbums.userAlbums);
    const userTodos = useSelector((state) => state.userTodos.userTodos);

    const PostsRef = useRef();
    const AlbumsRef = useRef();
    const TodosRef = useRef();

    const { status, error } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const params = useParams();

    const [details, setDetails] = useState("Posts");

    const detailsPosts = (event) => {
        PostsRef.current.id = "";
        AlbumsRef.current.id = "";
        TodosRef.current.id = "";
        event.target.id = cl.active;
        setDetails(event.target.innerHTML);
    };

    useEffect(() => {
        dispatch(getById(params.id));
        dispatch(getAlbumsByUserId(params.id));
        dispatch(getTodosByUserId(params.id));
        dispatch(getPostsByUserId(params.id));
    }, [dispatch]);

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
                                    id={userTodo.userId}
                                    idTodo={userTodo.id}
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
