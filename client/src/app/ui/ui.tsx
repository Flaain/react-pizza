import React from "react";
import getDataFromLocalStorage from "@/shared/lib/helpers/getDataFromLocalStorage";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "../model/appRouter";
import { userSelector } from "@/shared/model/selectors";
import { useAppSelector, useAsyncThunkDispatch } from "@/shared/model/store";
import { getProfile } from "../redux/slice/asyncActions";
import { getCart } from "@/pages/Cart/model/asyncActions";
import { CartInterface } from "@/pages/Cart/model/interfaces";
import { localStorageKeys } from "@/shared/config/constants";
import { setIsAuthInProgress } from "../redux/slice/user.slice";

const App = () => {
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

    return <RouterProvider router={appRouter} />;
};

export default App;
