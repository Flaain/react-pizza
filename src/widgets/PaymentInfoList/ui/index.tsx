import React from "react";
import getIntlPrice from "../../../shared/lib/helpers/getIntlPrice";
import { PaymentInfo } from "../../../pages/Cart/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/redux/store";

const PaymentInfoList: React.FC<Omit<PaymentInfo, "method" | "menu">> = ({ title, card }) => {
    const { deliveryInfo, priceView: { total } } = useSelector(({ cart }: RootState) => cart);
    return (
        <ul className='flex flex-col w-full items-start justify-start gap-5'>
            <li className='flex w-full items-start'>
                <span className='basis-[200px] text-gray-400'>Способ оплаты</span>
                <p className='font-medium w-[calc(100%-200px)]'>
                    {title.toLowerCase()} {card && `- ${card.address}`}
                </p>
            </li>
            <li className='flex w-full items-start'>
                <span className='basis-[200px] text-gray-400'>К оплате</span>
                <p className='font-medium w-[calc(100%-200px)]'>
                    {getIntlPrice(total + (deliveryInfo?.deliveryPrice ?? 0))}
                </p>
            </li>
        </ul>
    );
};

export default PaymentInfoList;
