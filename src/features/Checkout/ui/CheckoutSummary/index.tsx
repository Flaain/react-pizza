import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import getIntlPrice from "@/shared/lib/helpers/getIntlPrice";
import cn from "@/shared/lib/classNames";
import { Link } from "react-router-dom";
import { maxAddressLength } from "@/shared/config/constants";
import { useAppSelector } from "@/shared/model/store";
import { cartSelector, userSelector } from "@/shared/model/selectors";

const CheckoutSummary = () => {
    const { deliveryInfo, paymentInfo } = useAppSelector(userSelector);
    const { priceView: { intl } } = useAppSelector(cartSelector);

    return (
        <div className='flex flex-col gap-5'>
            <div className='flex flex-col'>
                <Link
                    to='delivery-method'
                    className='flex items-center justify-between group text-base font-medium text-primary-black hover:text-primary-orange'
                >
                    {deliveryInfo?.method === "pickup" ? "Доставка в пункт выдачи" : "Доставка курьером"}
                    <img src={getImageUrl("pen.svg")} alt='edit delivery info' />
                </Link>
                <p
                    className={cn(
                        "text-gray-400",
                        deliveryInfo?.address.length > maxAddressLength ? "truncate" : "break-words",
                    )}
                >
                    {deliveryInfo?.address}
                    {deliveryInfo?.rating && (
                        <span className="inline-flex items-center gap-2 ml-2">
                            <img src={getImageUrl("rating.svg")} width={15} height={15} alt='rating star' />
                            {deliveryInfo?.rating}
                        </span>
                    )}
                </p>
            </div>
            <div className='flex flex-col'>
                <button className='flex items-center justify-between group'>
                    <span className='text-base font-medium text-primary-black group-hover:text-primary-orange'>
                        Оплата {paymentInfo?.method === "card" ? "картой" : "наличными"}
                    </span>
                    <img src={getImageUrl("pen.svg")} alt='edit delivery info' />
                </button>
                {paymentInfo?.method === "card" && <p className='text-gray-400'>**{String(paymentInfo.card?.address).slice(-4)}</p>}
            </div>
            <div className='flex flex-col'>
                <span className='text-base font-medium text-primary-black'>Сумма товаров</span>
                <p className='text-gray-400'>{intl}</p>
            </div>
            {deliveryInfo?.method === "courier" && (
                <div className='flex flex-col'>
                    <span className='text-base font-medium text-primary-black'>Доставка</span>
                    <p className='text-gray-400'>{getIntlPrice(deliveryInfo.deliveryPrice!)}</p>
                </div>
            )}
        </div>
    );
};

export default CheckoutSummary;