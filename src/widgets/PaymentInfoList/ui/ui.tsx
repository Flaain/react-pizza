import React from "react";
import { Props } from "../model/interfaces";

const PaymentInfoList: React.FC<Props> = ({ card, method, total }) => {
    return (
        <ul className='flex flex-col w-full items-start justify-start gap-5'>
            <li className='flex w-full items-start'>
                <span className='basis-[200px] text-gray-400'>Оплата {method === "card" ? "картой" : "наличными"}</span>
                {card && <p className='font-medium w-[calc(100%-200px)]'>**{String(card.address).slice(-4)}</p>}
            </li>
            <li className='flex w-full items-start'>
                <span className='basis-[200px] text-gray-400'>К оплате</span>
                <p className='font-medium w-[calc(100%-200px)]'>{total}</p>
            </li>
        </ul>
    );
};

export default PaymentInfoList;