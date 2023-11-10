import React from "react";
import Spinner from "@/shared/ui/Spinner/ui";
import { currentRoute } from "./model";
import { RouteObject } from "react-router-dom";
import { DeliveryMethodModalRoute } from "../../features/DeliveryModal";

export { cartSlice, addToCart, clearCart, clearOrder } from "./store/slice";
export type { CartInterface, DeliveryInfo } from "./interfaces";

export const View = React.lazy(() => import("./ui/ui"));

export const ViewWithSuspense = () => {
    return (
        <React.Suspense fallback={<Spinner />}>
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