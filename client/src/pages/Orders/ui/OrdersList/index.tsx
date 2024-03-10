import { useOrders } from "../../lib/hooks/useOrders";
import OrderItem from "../OrderItem";

const OrdersList = () => {
    const { orders } = useOrders();

    return (
        <ul className='flex flex-col gap-5'>
            {orders.map((order) => (
                <OrderItem order={order} key={order._id} />
            ))}
        </ul>
    );
};

export default OrdersList;