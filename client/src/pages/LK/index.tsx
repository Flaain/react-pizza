import NotFound from "../NotFound/ui/ui";
import React from "react";
import Spinner from "@/shared/ui/Spinner/ui";
import { RouteObject } from "react-router-dom";
import { GuestGuard } from "@/shared/ui/GuestGuard";
import { currentRoute } from "./model/currentRoute";

const View = React.lazy(() => import("./ui/ui"));

export const ViewWithSuspense = () => {
    return (
        <React.Suspense
            fallback={
                <section className='min-h-[calc(100vh-102px)]'>
                    <Spinner position='center' />
                </section>
            }
        >
            <View />
        </React.Suspense>
    );
};

export const LKPage: RouteObject = {
    path: currentRoute,
    element: (
        <GuestGuard>
            <ViewWithSuspense />
        </GuestGuard>
    ),
    errorElement: (
        <NotFound
            title='Что-то пошло не так'
            description='не удалось отобразить личный кабинет, пожалуйста, попробуйте обновить страницу'
            reloadButton
        />
    ),
};