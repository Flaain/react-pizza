import React from "react";

import { fetchProducts } from "../redux";
import { ViewWithSuspense as NotFound } from "@/pages/NotFound";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "../appRouter";
import { appSelector } from "@/shared/model/selectors";
import { useAppSelector, useAsyncThunkDispatch } from "@/shared/model/store";

const App = () => {
    const { error } = useAppSelector(appSelector);

    const dispatch = useAsyncThunkDispatch();

    React.useEffect(() => {
        const controller = new AbortController();
        dispatch(fetchProducts(controller));
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