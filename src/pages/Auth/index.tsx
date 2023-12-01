import Spinner from "@/shared/ui/Spinner/ui";
import React from "react";
import { ViewWithSuspense as NotFound } from "@/pages/NotFound";
import { currentRoute } from "./model/currentRoute";
import { RouteObject } from "react-router-dom";
import { AuthGuard } from "@/shared/model/AuthGuard";

export { authSlice } from "./model/slice"

export const View = React.lazy(() => import("./ui/ui"));

export const ViewWithSuspense = () => {
    return (
        <React.Suspense fallback={<Spinner position='center' />}>
            <View />
        </React.Suspense>
    );
};

export const AuthPage: RouteObject = {
    path: currentRoute,
    errorElement: (
        <NotFound
            title='Что-то пошло не так'
            description='Пожалуйста, попробуйте обновить страницу'
            reloadButton
            reloadButtonText='Обновить страницу'
        />
    ),
    element: (
        <AuthGuard>
            <ViewWithSuspense />
        </AuthGuard>
    ),
};