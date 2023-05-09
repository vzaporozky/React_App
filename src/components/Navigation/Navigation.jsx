import { Link } from "react-router-dom";
import cl from "./Navigation.module.css";

export const Navigation = () => {
    return (
        <div className={cl.wrapper}>
            <Link to={"/PostsList"} className={cl.link}>
                PostsList
            </Link>
            <Link to={"/TodoList"} className={cl.link}>
                TodoList
            </Link>
            <Link to={"/UserList"} className={cl.link}>
                UserList
            </Link>
        </div>
    );
};
