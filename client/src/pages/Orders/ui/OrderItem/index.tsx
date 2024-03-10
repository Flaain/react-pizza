import React from "react";
import getIntlPrice from "@/shared/lib/helpers/getIntlPrice";
import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import Stacked from "@/shared/ui/Stacked/ui/ui";
import cn from "@/shared/lib/classNames";
import ExpandedOrderInfo from "../ExpandedOrderInfo";
import { OrderItemProps } from "../../model/interfaces";
import { AnimatePresence } from "framer-motion";
import { orderStatusses } from "../../model/orderStatusses";
import { paymentWays } from "../../model/paymentWays";

const OrderItem = ({ order }: OrderItemProps) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    const orderDate = new Date(order.createdAt);
    const items = React.useMemo(() => order.cart.items.map((item) => ({ id: item._id as string, src: item.imageUrl })), [order]);

    return (
        <li className='w-full border border-solid border-primary-gray rounded-lg p-5 box-border'>
            <ul className='flex items-center gap-5 justify-between pb-4 border-b border-solid border-primary-gray'>
                <li
                    className={cn(
                        "flex flex-col pl-5 gap-2 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:rounded-full",
                        orderStatusses[order.status].bgColor
                    )}
                >
                    <h2 className='opacity-50'>Заказ</h2>
                    <p className='text-primary-black' title={orderDate.toLocaleString()}>
                        № {order._id}
                        <span className='ml-2 opacity-50 text-sm font-normal'>{orderDate.toLocaleDateString()}</span>
                    </p>
                </li>
                <li className='flex flex-col gap-2'>
                    <h2 className='opacity-50'>Сумма заказа</h2>
                    <p className='text-primary-black'>
                        {getIntlPrice(order.total_amount! / 100 || order.cart.total_price)}
                    </p>
                </li>
                <li className='flex flex-col gap-2'>
                    <h2 className='opacity-50'>Статус</h2>
                    <p className='text-primary-black'>{orderStatusses[order.status].title}</p>
                </li>
                <li className='flex flex-col gap-2'>
                    <h2 className='opacity-50'>Оплачено</h2>
                    <p className='text-primary-black'>{paymentWays[order.paymentInfo.method]}</p>
                </li>
                <li className='flex flex-col gap-2'>
                    <button className='p-2' onClick={() => setIsExpanded((prevState) => !prevState)}>
                        <img
                            src={getImageUrl("arrow-down.svg")}
                            alt='arrow'
                            className={cn("transition-transform ease-in-out duration-200", isExpanded && "rotate-180")}
                        />
                    </button>
                </li>
            </ul>
            <div className='flex items-center justify-between pt-4 transition-all duration-200 ease-in-out'>
                <p className='text-primary-black'>{order.deliveryInfo.address.line}</p>
                <Stacked items={items} MAX_ITEMS={5} />
            </div>
            <AnimatePresence>{isExpanded && <ExpandedOrderInfo order={order} />}</AnimatePresence>
        </li>
    );
};

export default OrderItem;