import OrderItem from "@/entities/Product/ui/OrderItem";
import { Order } from "@/shared/model/interfaces";

const OrderList = ({ order }: Omit<Order, "totalPrice" | "deliveryInfo">) => {
    return (
        <ul className='flex flex-col gap-5 w-full overflow-auto max-h-[600px] pr-10'>
            {order.flatMap((product) =>
                product.items.map((item) => (
                    <OrderItem key={`${product.id} - ${item.id}`} {...product} {...item} img={product.imageUrl} />
                ))
            )}
        </ul>
    );
};

export default OrderList;