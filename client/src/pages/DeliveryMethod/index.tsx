import React from "react";
import { RouteObject } from "react-router-dom";
import { currentRoute } from "./model/currentRoute";
import { api } from "@/shared/api";
import { LazyErrorElement } from "./model/lazy";

export const View = React.lazy(() => import("./ui/ui"));

export const DeliveryMethodPage: RouteObject = {
    path: currentRoute,
    element: <View title='Способ доставки' />,
    errorElement: <LazyErrorElement />,
    loader: () => api.base.getStaticAddresses(),
    shouldRevalidate: () => false,
};