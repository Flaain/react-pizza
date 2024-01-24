import React from "react";
import Spinner from "@/shared/ui/Spinner/ui";
import { RouteObject } from "react-router-dom";
import { currentRoute } from "./model/currentRoute";
import { Props } from "./model/interfaces";

export const View = React.lazy(() => import("./ui/ui"));

export const ViewWithSuspense = (props: Props) => {
    return (
        <React.Suspense fallback={<Spinner position='center' />}>
            <View {...props} />
        </React.Suspense>
    );
};

export const NotFoundPage: RouteObject = {
    path: currentRoute,
    element: <ViewWithSuspense title='Страница не найдена' backLink backLinkText='Вернуться назад' />,
};