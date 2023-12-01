import React from "react";
import Spinner from "@/shared/ui/Spinner/ui";
import { RouteObject } from "react-router-dom";
import { currentRoute } from "./model";
import { Props } from "./interfaces";

export { default as Page } from "./ui/ui";

export const View = React.lazy(() => import("./ui/ui"));

export const ViewWithSuspense: React.FC<Props> = (props) => {
    return (
        <React.Suspense fallback={<Spinner position="center"/>}>
            <View {...props} />
        </React.Suspense>
    );
};

export const NotFoundPage: RouteObject = {
    path: currentRoute,
    element: <ViewWithSuspense title='Страница не найдена' backLink backLinkText='Вернуться назад' />,
};