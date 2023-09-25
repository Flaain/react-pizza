import React from "react";
import OrderItem from "../../../entities/OrderItem/ui";
import { Order } from "../../../shared/api/interfaces";

const OrderList: React.FC<Omit<Order, "totalPrice" | "deliveryInfo">> = ({ order }) => {
    return (
        <ul className='flex flex-col gap-5 w-full overflow-auto max-h-[600px] pr-10'>
            {order.flatMap(({ id, items, imageUrl, title }) =>
                items.map((item) => (
                    <OrderItem key={`${id} - ${item.id}`} {...{ ...item, imageUrl, title }} />
                ))
            )}
        </ul>
    );
};

export default OrderList;