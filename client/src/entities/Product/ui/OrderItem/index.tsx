import Image from "@/shared/ui/Image/ui/ui";
import getIntlPrice from "@/shared/lib/helpers/getIntlPrice";
import { initialTypes } from "@/shared/config/constants";
import { OrderItemProps } from "../../model/interfaces";

const OrderItem = ({ title, price, type, size, count, img }: OrderItemProps) => {
    return (
        <li>
            <div className='flex items-center gap-5 justify-between'>
                <div className='flex items-center gap-5'>
                    <Image src={img} />
                    <div className='flex flex-col'>
                        <h2 className='text-primary-black text-lg font-medium mb-2'>{title}</h2>
                        <span className='text-gray-400'>Размер: {size}</span>
                        <span className='text-gray-400'>Тесто: {initialTypes[type]}</span>
                        <span className='text-gray-400'>Количество: {count}</span>
                    </div>
                </div>
                <span className='text-xl text-primary-black font-bold'>{getIntlPrice(price * count)}</span>
            </div>
        </li>
    );
};

export default OrderItem;