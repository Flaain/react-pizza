import React from "react";
import { Order } from "@/shared/model/interfaces";
import { api } from "@/shared/api";
import { useAppSelector } from "@/shared/model/store";
import { userSelector } from "@/shared/model/selectors";

export const useOrders = () => {
    const { token } = useAppSelector(userSelector);

    const [loading, setLoading] = React.useState(true);
    const [orders, setOrders] = React.useState<Array<Order>>([]);

    React.useEffect(() => {
        (async () => {
            try {
                const {
                    data: { orders },
                } = await api.base.getOrders({ token: token as string });
                setOrders(orders);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return {
        loading,
        orders,
        isEmpty: !orders.length && !loading,
    };
};