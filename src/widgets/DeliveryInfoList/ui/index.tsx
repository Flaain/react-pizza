import React from "react";
import cn from "@/shared/lib/classNames";
import getIntlPrice from "@/shared/lib/helpers/getIntlPrice";
import { DeliveryInfo } from "@/pages/Cart";

const DeliveryInfoList: React.FC<Omit<DeliveryInfo, 'rating'>> = ({ address, method, deliveryPrice }) => {
    return (
        <ul className='flex flex-col w-full items-start justify-start gap-5'>
            <li className='flex w-full items-start'>
                <span className='basis-[200px] text-gray-400'>{method === 'courier' ? 'Курьером' : 'Пункт выдачи'}</span>
                <p className={cn("font-medium w-[calc(100%-200px)]", address.length > 300 ? "truncate" : "break-words")}>
                    {address}
                </p>
            </li>
            <li className='flex items-start w-full'>
                <span className='basis-[200px] text-gray-400'>Стоимость доставки</span>
                <p className='font-medium'>{deliveryPrice ? getIntlPrice(deliveryPrice) : "Бесплатно"}</p>
            </li>
        </ul>
    );
};

export default DeliveryInfoList;