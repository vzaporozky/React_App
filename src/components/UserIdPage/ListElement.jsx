import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ListElement = ({ className, icon, name, text }) => {
    return (
        <li className={className}>
            <FontAwesomeIcon icon={icon} />
            <span>
                <p>{name}</p>
                {text}
            </span>
        </li>
    );
};
