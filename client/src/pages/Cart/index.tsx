import React from "react";
import CartSkeleton from "./ui/Skeletons/CartSkeleton";
import { currentRoute } from "./model/currentRoute";
import { RouteObject } from "react-router-dom";
import { ViewWithSuspense as NotFound } from "../NotFound";
import { DeliveryMethodPage } from "../DeliveryMethod";
import { View } from "./model/lazy";

export { cartSlice, addToCart, clearCart, clearOrder } from "./model/slice";
export type { CartInterface } from "./model/interfaces";

export const ViewWithSuspense = () => {
    return (
        <React.Suspense fallback={<CartSkeleton />}>
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