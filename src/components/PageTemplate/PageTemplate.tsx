import { Navigation } from "../Navigation/Navigation";
import cl from "./PageTemplate.module.css";

import { PageTemplateState } from "../../interfaces";

export const PageTemplate: React.FC<PageTemplateState> = ({
    name,
    status,
    error,
}) => {
    return (
        <>
            <Navigation />
            <h1>{name}</h1>

            {status === "Loading" && <h2 className={cl.loading}>Loading</h2>}
            {error && <h2>An error occerd: {error}</h2>}
        </>
    );
};
