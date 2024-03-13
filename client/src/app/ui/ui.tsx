import React from "react";
import getDataFromLocalStorage from "@/shared/lib/helpers/getDataFromLocalStorage";
import { ViewWithSuspense as NotFound } from "@/pages/NotFound";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "../model/appRouter";
import { appSelector, userSelector } from "@/shared/model/selectors";
import { useAppSelector, useAsyncThunkDispatch } from "@/shared/model/store";
import { getProfile } from "../redux/slice/asyncActions";
import { getCart } from "@/pages/Cart/model/asyncActions";
import { CartInterface } from "@/pages/Cart/model/interfaces";
import { localStorageKeys } from "@/shared/config/constants";
import { setIsAuthInProgress } from "../redux/slice/user.slice";

const App = () => {
    const { error } = useAppSelector(appSelector);
    const { token } = useAppSelector(userSelector);

    const dispatch = useAsyncThunkDispatch();

    React.useEffect(() => {
        if (token) {
            dispatch(getProfile(token));
            return;
        }

        dispatch(getCart(getDataFromLocalStorage<Array<Omit<CartInterface, "category">>>(localStorageKeys.CART, [])));
        dispatch(setIsAuthInProgress(false));
    }, []);

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