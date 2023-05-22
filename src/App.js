import React from "react";
import { RouterProvider } from "react-router-dom";

import "./App.css";
import "./normalize.css";
import { router } from "./routing/index";

function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
