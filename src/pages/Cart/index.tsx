import React from "react";
import { currentRoute } from "./model/currentRoute";
import { RouteObject } from "react-router-dom";
import { ViewWithSuspense as NotFound } from "../NotFound";
import { DeliveryMethodPage } from "../DeliveryMethod";
import Skeleton from "./ui/Skeleton";

export { cartSlice, addToCart, clearCart, clearOrder } from "./model/slice";
export { type CartInterface, type DeliveryInfo, type PaymentInfo } from "./model/interfaces";

export const View = React.lazy(() => import("./ui/ui"));

export const ViewWithSuspense = () => {
    return (
        <React.Suspense fallback={<Skeleton />}>
            <View />
        </React.Suspense>
    );
};

export const CartPage: RouteObject = {
    path: currentRoute,
    element: <ViewWithSuspense />,
    errorElement: (
        <NotFound
            title='Что-то пошло не так'
            description='не удалось отобразить корзину, пожалуйста, попробуйте обновить страницу'
            reloadButton
        />
    ),
    children: [DeliveryMethodPage],
};