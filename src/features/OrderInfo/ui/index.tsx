import React from "react";
import cn from "../../../shared/lib/classNames";
import getImageUrl from "../../../shared/lib/helpers/getImageUrl";
import getIntlPrice from "../../../shared/lib/helpers/getIntlPrice";
import PromocodeForm from "../../PromocodeForm/ui";
import { Props } from "../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/redux/store";

const OrderInfo: React.FC<Props> = ({ handleOrder, setPaymentInfoModalOpened }) => {
    const dispatch = useDispatch();

    const [showPromocodeForm, setShowPromocodeForm] = React.useState(false);

    return (
        <div
            className={cn(
                "row-start-1 col-start-6 col-end-8 sticky top-5 flex flex-col self-start justify-between gap-5 col-span-2 p-5 rounded-xl bg-white shadow-xl border border-solid border-primary-gray"
            )}
        >
            {deliveryInfo && paymentInfo ? (
                <div className='flex flex-col gap-5'>
                    <div className='flex flex-col'>
                        <button
                            disabled={orderLoading}
                            className='flex items-center justify-between group'
                            onClick={() => dispatch(changeDeliveryMethodParam('opened'))}
                        >
                            <span className='text-base font-medium text-primary-black group-hover:text-primary-orange'>
                                Доставка {deliveryInfo.type.toLowerCase()}
                            </span>
                            <img src={getImageUrl("pen.svg")} alt='edit delivery info' />
                        </button>
                        <p
                            title={deliveryInfo?.address}
                            className={cn(
                                "w-full text-gray-400",
                                deliveryInfo?.address.length > 200 ? "truncate" : "break-words"
                            )}
                        >
                            {deliveryInfo?.address}
                        </p>
                    </div>
                    <div className='flex flex-col'>
                        <button
                            disabled={orderLoading}
                            className='flex items-center justify-between group'
                            onClick={() => dispatch(changeDeliveryMethodParam('opened'))}
                        >
                            <span className='text-base font-medium text-primary-black group-hover:text-primary-orange'>
                                Оплата {paymentInfo.title.toLowerCase()}
                            </span>
                            <img src={getImageUrl("pen.svg")} alt='edit delivery info' />
                        </button>
                        {paymentInfo.card && <p className='text-gray-400'>{paymentInfo.card.address}</p>}
                    </div>
                    {deliveryInfo.deliveryPrice && (
                        <div className='flex flex-col'>
                            <span className='text-base font-medium text-primary-black'>Сумма товаров</span>
                            <p className='text-gray-400'>{intl}</p>
                        </div>
                    )}
                    <div className='flex flex-col'>
                        <span className='text-base font-medium text-primary-black'>Доставка</span>
                        <p className='text-gray-400'>
                            {deliveryInfo.deliveryPrice ? getIntlPrice(deliveryInfo.deliveryPrice) : "Бесплатно"}
                        </p>
                    </div>
                </div>
            ) : (
                <button
                    className='flex items-center justify-between group'
                    onClick={() => (deliveryInfo ? setPaymentInfoModalOpened(true) : dispatch(changeDeliveryMethodParam('opened')))}
                >
                    <span className='text-lg text-primary-black font-medium group-hover:text-primary-orange'>
                        {deliveryInfo ? "Заполните форму оплаты" : "Заполните форму доставки"}
                    </span>
                    <img src={getImageUrl("pen.svg")} alt='edit delivery address' />
                </button>
            )}
            <div className='flex flex-col gap-2'>
                <p className={cn("flex items-center justify-between", !deliveryInfo && "opacity-50")}>
                    <span className='text-2xl font-bold'>Итого</span>
                    <span className='text-2xl font-bold'>
                        {getIntlPrice(total + (deliveryInfo?.deliveryPrice ?? 0))}
                    </span>
                </p>
                <button
                    disabled={orderLoading}
                    onClick={() => setShowPromocodeForm((prevState) => !prevState)}
                    className='text-primary-black border-b border-dashed hover:text-primary-orange hover:border-primary-orange flex self-start'
                >
                    {showPromocodeForm ? "У меня нет промокода" : "У меня есть промокод"}
                </button>
                {showPromocodeForm && <PromocodeForm promocodes={promocodes} />}
                <button
                    disabled={orderLoading || (!deliveryInfo || !paymentInfo)}
                    onClick={handleOrder}
                    type='button'
                    className={cn(
                        "relative mt-2 min-w-full whitespace-nowrap min-h-[40px] group font-bold text-base text-white bg-primary-orange py-2 px-5 rounded-full flex items-center justify-center gap-2",
                        orderLoading &&
                            "after:absolute after:top-2/4 after:left-2/4 after:w-[20px] after:animate-loading after:h-[20px] after:border-[3px] after:border-t-transparent after:border-solid after:border-white after:rounded-full after:flex after:items-center after:justify-center",
                        (!deliveryInfo || !paymentInfo) && "opacity-50 cursor-default",
                        !!deliveryInfo && !orderLoading && !!paymentInfo && "active:scale-[0.98]"
                    )}
                >
                    {orderLoading ? "" : "Заказать"}
                </button>
            </div>
        </div>
    );
};

export default OrderInfo;