import cl from "./PostItem.module.css";

import { PostItemState } from "../../../interfaces";

export const PostItem: React.FC<PostItemState> = ({ title, body }) => {
    return (
        <li className={cl.post}>
            <p>{title}</p>
            <p>{body}</p>
        </li>
    );
};
