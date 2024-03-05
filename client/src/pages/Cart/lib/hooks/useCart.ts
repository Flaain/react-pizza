import React from "react";
import { cartSelector, userSelector } from "@/shared/model/selectors";
import { useAppSelector } from "@/shared/model/store";
import { useDispatch } from "react-redux";
import { clearCart } from "../..";
import { api } from "@/shared/api";
import { useNavigate } from "react-router-dom";

export const useCart = () => {
    const { cart, cartLoading } = useAppSelector(cartSelector);
    const { isAuthInProgress, paymentInfo, jwt } = useAppSelector(userSelector);

    const [isCartMinimized, setIsCartMinimized] = React.useState(false);
    const [orderLoading, setOrderLoading] = React.useState(false);

    const cartArr = React.useMemo(() => [...cart.values()], [cart]);
    const isCartEmpty = !cart.size && !cartLoading && !isAuthInProgress;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const actions = React.useMemo(() => ({
        card: async () => {
            const { data: url } = await api.cart.createCheckoutSesstion({ token: jwt as string });
            window.location.href = url;
        },
        cash: async () => {
            const { data: { _id } } = await api.cart.createOrder({ token: jwt as string });
            navigate(`/orders/${_id}`);
        },
    }), [jwt, navigate]);

    const handleOrder = React.useCallback(async () => {
        try {
            setOrderLoading(true);

            await actions[paymentInfo!.method]();
            await api.cart.clearCart({ token: jwt as string });

            dispatch(clearCart());
        } catch (error) {
            console.error(error);
        } finally {
            setOrderLoading(false);
        }
    }, [actions, paymentInfo, jwt, dispatch]);

    return {
        cartArr,
        cartLoading,
        isCartEmpty,
        handleOrder,
        isCartMinimized,
        setIsCartMinimized,
        orderLoading,
    };
};