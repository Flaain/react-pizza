import React from "react";
import Spinner from "@/shared/ui/Spinner/ui";
import { currentRoute } from "./model/currentRoute";
import { RouteObject } from "react-router-dom";
import { DeliveryMethodModalRoute } from "@/features/DeliveryModal";

export { cartSlice, addToCart, clearCart, clearOrder } from "./model/slice";
export { type CartInterface, type DeliveryInfo } from "./model/interfaces";

export const View = React.lazy(() => import("./ui/ui"));

export const ViewWithSuspense = () => {
    return (
        <React.Suspense fallback={<Spinner position="center"/>}>
            <View />
        </React.Suspense>
    );
};

export const CartPage: RouteObject = {
    path: currentRoute,
    element: <ViewWithSuspense />,
    errorElement: <div>error</div>,
    children: [DeliveryMethodModalRoute],
};