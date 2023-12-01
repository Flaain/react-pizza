import React from "react";
import Skeleton from "./ui/Skeleton/Skeleton";
import { RouteObject } from "react-router-dom";
import { currentRoute } from "./model/currentRoute";

export const View = React.lazy(() => import("./ui/ui"));

export const ViewWithSuspense = () => {
    return (
        <React.Suspense fallback={<Skeleton />}>
            <View />
        </React.Suspense>
    );
};

export const HomePage: RouteObject = {
    path: currentRoute,
    element: <ViewWithSuspense />,
};