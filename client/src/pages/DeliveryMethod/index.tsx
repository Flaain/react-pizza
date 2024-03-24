import DeliveryMethod from "./ui/ui";
import { RouteObject } from "react-router-dom";
import { currentRoute } from "./model/currentRoute";
import { api } from "@/shared/api";
import { LazyErrorElement } from "./model/lazy";

export const DeliveryMethodPage: RouteObject = {
    path: currentRoute,
    element: <DeliveryMethod title='Способ доставки' />,
    errorElement: <LazyErrorElement />,
    loader: () => ({ addresses: api.base.getStaticAddresses() }),
    shouldRevalidate: () => false,
};