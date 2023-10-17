import React from "react";
import ReactDOM from "react-dom/client";
import App from "./index.tsx";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./styles/base.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);