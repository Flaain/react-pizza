import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import getIntlPrice from "@/shared/lib/helpers/getIntlPrice";
import CheckoutInfoActionLink from "../CheckoutInfoActionLink";
import { useAppSelector } from "@/shared/model/store";
import { cartSelector, userSelector } from "@/shared/model/selectors";
import { routerList } from "@/shared/config/constants";

const CheckoutSummary = () => {
    const { deliveryInfo, paymentInfo } = useAppSelector(userSelector);
    const { priceView: { intl } } = useAppSelector(cartSelector);

    return (
        <div className='flex flex-col gap-5'>
            <CheckoutInfoActionLink deliveryInfo={deliveryInfo!} to={routerList.CART.children.DELIVERY_METHOD} />
            <div className='flex flex-col'>
                <button className='flex items-center justify-between group'>
                    <span className='text-base font-medium text-primary-black group-hover:text-primary-orange'>
                        Оплата {paymentInfo?.method === "card" ? "картой" : "наличными"}
                    </span>
                    <img src={getImageUrl("pen.svg")} alt='edit delivery info' />
                </button>
                {paymentInfo?.method === "card" && (
                    <p className='text-gray-400'>**{String(paymentInfo.card?.address).slice(-4)}</p>
                )}
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