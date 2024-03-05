import React from "react";
import ProductDetailsSkeleton from "./ui/Skeleton";
import { currentRoute } from "./model/currentRoute";
import { RouteObject } from "react-router-dom";
import { api } from "@/shared/api";
import { ViewWithSuspense as NotFound } from "../NotFound";

export const View = React.lazy(() => import("./ui/ui"));

export const ViewWithSuspense = () => {
    return (
        <React.Suspense fallback={<ProductDetailsSkeleton />}>
            <View />
        </React.Suspense>
    );
};

export const ProductDetailsPage: RouteObject = {
    path: currentRoute,
    element: <ViewWithSuspense />,
    errorElement: <NotFound title='Что-то пошло не так, продукт не найден' backLink backLinkText='Вернуться на главную' />,
    loader: ({ params: { id } }) => api.base.getProductDetails({ id: +id! }),
    shouldRevalidate: ({ currentParams, nextParams }) => currentParams.id !== nextParams.id,
};
