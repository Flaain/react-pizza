import EmptyOrders from "./EmptyOrders";
import Spinner from "@/shared/ui/Spinner/ui";
import cn from "@/shared/lib/classNames";
import OrdersList from "./OrdersList";
import { useOrders } from "../lib/hooks/useOrders";

const Orders = () => {
    const { isEmpty, loading } = useOrders();

    if (isEmpty) return <EmptyOrders />;

    return (
        <section className={cn("pb-5", loading && "min-h-[calc(100vh-102px)]")}>
            {loading ? <Spinner position='center' /> : <OrdersList />}
        </section>
    );
};

export default Orders;
