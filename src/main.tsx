import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/ui/ui";
import { store } from "./app/redux/store";
import { Provider } from "react-redux";

import "./app/styles/base.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);