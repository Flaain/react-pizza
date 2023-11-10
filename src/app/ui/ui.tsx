import React from "react";

import { RootState, fetchPizzas, rootSelector } from "../redux";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { ViewWithSuspense as NotFound } from "@/pages/NotFound";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "../appRouter";

const App = () => {
    const { error } = useSelector(rootSelector);

    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();

    React.useEffect(() => {
        dispatch(fetchPizzas());
    }, []);

    return error ? (
        <NotFound
            title='Не удалось получить данные с сервера'
            description='Пожалуйста, проверьте свое соединение с интернетом и обновите страницу'
            reloadButton
            reloadButtonText='Обновить страницу'
            screen
            error={error}
        />
    ) : (
        <RouterProvider router={appRouter} />
    );
};

export default App;