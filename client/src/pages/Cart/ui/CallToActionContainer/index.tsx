import React from "react";
import getIntlPrice from "@/shared/lib/helpers/getIntlPrice";

import { useAppSelector } from "@/shared/model/store";
import { cartSelector, userSelector } from "@/shared/model/selectors";
import { useNavigate } from "react-router-dom";
import { routerList } from "@/shared/config/constants";
import { CallToActionBlock } from "@/shared/ui/CallToActionBlock";

const CallToActionContainer = ({
    setPaymentModalOpened,
}: {
    setPaymentModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const { deliveryInfo, paymentInfo, isAuthenticated } = useAppSelector(userSelector);
    const {
        priceView: { totalPrice },
    } = useAppSelector(cartSelector);
    const { name, email } = useAppSelector(userSelector);

    const navigate = useNavigate();

    return (
        <ul className='grid grid-cols-2'>
            <CallToActionBlock
                component={
                    <ul className='flex flex-col w-full items-start justify-start gap-5'>
                        <li className='flex w-full items-start gap-2'>
                            <span className='min-w-[220px] text-gray-400'>
                                Доставка {deliveryInfo?.method === "pickup" ? "в пункт выдачи" : "курьером"}
                            </span>
                            <p className='font-medium'>{deliveryInfo?.address.line}</p>
                        </li>
                        <li className='flex w-full items-start gap-2'>
                            <span className='w-[220px] text-gray-400'>Стоимость доставки</span>
                            <p className='font-medium'>
                                {deliveryInfo?.deliveryPrice ? getIntlPrice(deliveryInfo.deliveryPrice) : "Бесплатно"}
                            </p>
                        </li>
                    </ul>
                }
                reason={!deliveryInfo}
                reasonText='Заполните форму доставки'
                title='Способ доставки'
                action={() => navigate(routerList.CART.children.DELIVERY_METHOD)}
            />
            <CallToActionBlock
                component={
                    <ul className='flex flex-col w-full items-start justify-start gap-5'>
                        <li className='flex w-full items-start'>
                            <span className='min-w-[220px] text-gray-400'>
                                Оплата {paymentInfo?.method === "card" ? "картой" : "наличными при получении"}
                            </span>
                            {paymentInfo?.method === "card" && (
                                <p className='font-medium'>мы используем платежную систему Stripe</p>
                            )}
                        </li>
                        <li className='flex w-full items-start'>
                            <span className='min-w-[220px] text-gray-400'>К оплате</span>
                            <p className='font-medium'>
                                {getIntlPrice(totalPrice + (deliveryInfo?.deliveryPrice ?? 0))}
                            </p>
                        </li>
                    </ul>
                }
                reason={!paymentInfo}
                reasonText='Заполните форму оплаты'
                title='Способ оплаты'
                action={() => setPaymentModalOpened(true)}
            />
            <CallToActionBlock
                component={
                    <ul className='flex flex-col w-full items-start justify-start gap-5'>
                        <li className='flex w-full items-start'>
                            <span className='min-w-[220px] text-gray-400'>Имя</span>
                            <p className='font-medium'>{name}</p>
                        </li>
                        <li className='flex w-full items-start'>
                            <span className='min-w-[220px] text-gray-400'>Почта</span>
                            <p className='font-medium'>{email}</p>
                        </li>
                    </ul>
                }
                reason={!isAuthenticated}
                reasonText='Пожалуйста, войдите или зарегистрируйтесь'
                title='Мой профиль'
            />
        </ul>
    );
};

export default CallToActionContainer;