import React from "react";
import ReactDOM from "react-dom/client";
import App from "./index.tsx";
import { BrowserRouter } from "react-router-dom";

import "./styles/base.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);