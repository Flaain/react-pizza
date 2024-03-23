import { Order } from "@/shared/model/interfaces";
import OrderItem from "../OrderItem";

const OrdersList = ({ orders }: { orders: Array<Order> }) => {
    return (
        <ul className='flex flex-col gap-5'>
            {orders.map((order) => (
                <OrderItem order={order} key={order._id} />
            ))}
        </ul>
    );
};

export default OrdersList;