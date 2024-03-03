import NotFound from "../NotFound/ui/ui";
import React from "react";
import Spinner from "@/shared/ui/Spinner/ui";
import { RouteObject } from "react-router-dom";
import { currentRoute } from "./model/currentRoute";
import { GuestGuard } from "@/shared/ui/GuestGuard";

const View = React.lazy(() => import("./ui/ui"));

export const ViewWithSuspense = () => {
    return (
        <React.Suspense fallback={<Spinner position='center' />}>
            <View />
        </React.Suspense>
    );
};

export const OrdersPage: RouteObject = {
    path: currentRoute,
    element: (
        <GuestGuard>
            <ViewWithSuspense />
        </GuestGuard>
    ),
    errorElement: (
        <NotFound
            title='Что-то пошло не так'
            description='не удалось отобразить корзину, пожалуйста, попробуйте обновить страницу'
            reloadButton
        />
    ),
};