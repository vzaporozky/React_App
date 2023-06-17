import React from "react";
import { RouterProvider } from "react-router-dom";
import "./normalize.css";

import "./App.css";
import { router } from "./routing/index";

function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
