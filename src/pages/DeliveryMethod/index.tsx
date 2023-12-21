import React from "react";
import DeliveryMethod from "./ui/ui";
import ErrorElement from "./ui/ErrorElement/ErrorElement";
import { RouteObject } from "react-router-dom";
import { currentRoute } from "./model/currentRoute";
import { api } from "@/shared/api";

export const View = React.lazy(() => import("./ui/ui"));

export const DeliveryMethodPage: RouteObject = {
    path: currentRoute,
    element: <DeliveryMethod title='Способ доставки' />,
    errorElement: <ErrorElement />,
    loader: () => ({ data: api.getStaticAddresses() }),
};