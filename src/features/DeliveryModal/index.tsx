import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { currentRoute } from "./model";

export { deliveryModalSlice } from "./store/slice";

export const View = lazy(() => import("./ui/ui"));

export const DeliveryMethodModalRoute: RouteObject = {
    path: currentRoute,
    element: <View title='Способ доставки' />,
};