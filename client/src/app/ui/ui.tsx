import React from "react";
import { ViewWithSuspense as NotFound } from "@/pages/NotFound";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "../model/appRouter";
import { appSelector, userSelector } from "@/shared/model/selectors";
import { useAppSelector, useAsyncThunkDispatch } from "@/shared/model/store";
import { getProfile } from "../redux/slice/asyncActions";

const App = () => {
    const { error } = useAppSelector(appSelector);
    const { jwt } = useAppSelector(userSelector);

    const dispatch = useAsyncThunkDispatch();

    React.useEffect(() => {
        jwt && dispatch(getProfile(jwt));
    }, [])

    return error ? (
        <NotFound
            title='Не удалось получить данные с сервера'
            description='Пожалуйста, проверьте свое соединение с интернетом и обновите страницу'
            reloadButton
            screen
            error={error}
        />
    ) : (
        <RouterProvider router={appRouter} />
    );
};

export default App;