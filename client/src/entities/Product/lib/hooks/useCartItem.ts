import React from "react";
import { userSelector } from "@/shared/model/selectors";
import { useAppSelector } from "@/shared/model/store";
import { initialSizes } from "@/shared/config/constants";
import { changeItemCount, removeProductFromCart } from "@/pages/Cart/model/slice";
import { useDispatch } from "react-redux";
import { api } from "@/shared/api";

export const useCartItem = ({ _id, size, type, count, productId }: { _id?: string, size: number, type: number, count?: number, productId: number }) => {
    const { lang, token, isAuthenticated } = useAppSelector(userSelector);

    const [itemCount, setItemCount] = React.useState(count ?? 1);
    const [loading, setLoading] = React.useState(false);

    const key = `${productId}_${size}_${type}`;
    const intlSize = React.useMemo(() => new Intl.NumberFormat(lang, { style: "unit", unit: "centimeter", unitDisplay: "short" }).format(initialSizes[size]), []);

    const dispatch = useDispatch();

    const handleChange = React.useCallback(async ({ target: { valueAsNumber } }: React.ChangeEvent<HTMLInputElement>) => {
        const isValueInvalid = !valueAsNumber || valueAsNumber > 100;
        const count = isValueInvalid ? 1 : valueAsNumber;
        
        try {
            setLoading(true);
            
            isAuthenticated && _id && (await api.cart.changeQuantity({
                _id,
                token: token as string,
                body: JSON.stringify({ action: "direct", value: count })
            }));  
            setItemCount(count);
            dispatch(changeItemCount({ type: "direct", count, key }));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

    }, [count]);

    const handleIncrease = React.useCallback(async () => {
        try {
            setLoading(true);

            isAuthenticated && _id && (await api.cart.changeQuantity({
                _id,
                token: token as string,
                body: JSON.stringify({ action: "increment", value: 1 })
            }));
            setItemCount((prevState) => prevState + 1);
            dispatch(changeItemCount({ type: "increase", key }));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, token]);

    const handleDecrease = async () => {
        try {
            setLoading(true);

            isAuthenticated && _id && (await api.cart.changeQuantity({
                _id,
                token: token as string,
                body: JSON.stringify({ action: "decrement", value: 1 })
            }));
            setItemCount((prevState) => prevState - 1);
            dispatch(changeItemCount({ type: "decrease", key }));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveItemFromCart = async () => {
        try {
            setLoading(true);

            isAuthenticated && _id && (await api.cart.removeItemFromCart({ _id, token: token as string }));
            dispatch(removeProductFromCart({ key }));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        itemCount,
        loading,
        intlSize,
        handleChange,
        handleIncrease,
        handleDecrease,
        handleRemoveItemFromCart
    };
}