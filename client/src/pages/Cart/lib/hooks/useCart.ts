import React from "react";
import { cartSelector, userSelector } from "@/shared/model/selectors";
import { useAppSelector } from "@/shared/model/store";
import { useDispatch } from "react-redux";
import { clearCart } from "../..";
import { api } from "@/shared/api";
import { useNavigate } from "react-router-dom";
import { routerList } from "@/shared/config/constants";
import { setExtraInfo } from "@/app/redux/slice/user.slice";

export const useCart = () => {
    const { cart, cartLoading } = useAppSelector(cartSelector);
    const { isAuthInProgress, paymentInfo, token } = useAppSelector(userSelector);

    const [isCartMinimized, setIsCartMinimized] = React.useState(false);
    const [orderLoading, setOrderLoading] = React.useState(false);

    const cartArr = React.useMemo(() => [...cart.values()], [cart]);
    const isCartEmpty = !cart.size && !cartLoading && !isAuthInProgress;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const actions = React.useMemo(() => ({
        card: async () => {
            const { data: { url } } = await api.cart.createCheckoutSesstion({ token: token as string });
            window.location.href = url;
        },
        cash: async () => {
            const { data: { extraInfo } } = await api.cart.createOrder({ token: token as string });
            dispatch(setExtraInfo(extraInfo));
            navigate(routerList.LK.children.ORDERS);
        },
    }), [token]);

    const handleOrder = React.useCallback(async () => {
        try {
            setOrderLoading(true);

            await actions[paymentInfo!.method]();
            await api.cart.clearCart({ token: token as string });

            dispatch(clearCart());
        } catch (error) {
            console.error(error);
        } finally {
            setOrderLoading(false);
        }
    }, [actions, paymentInfo, token, dispatch]);

    const handleClearCart = React.useCallback(async () => {
        try {
            await api.cart.clearCart({ token: token as string });
            dispatch(clearCart());
        } catch (error) {
            console.error(error);
        }
    }, []);

    return {
        cartArr,
        cartLoading,
        isCartEmpty,
        handleOrder,
        handleClearCart,
        isCartMinimized,
        setIsCartMinimized,
        orderLoading,
    };
};