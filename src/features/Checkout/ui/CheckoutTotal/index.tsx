import CheckoutControls from "../CheckoutControls";
import getIntlPrice from "@/shared/lib/helpers/getIntlPrice";
import { CheckoutTotalProps } from "../../model";
import { useAppSelector } from "@/shared/model/store";
import { cartSelector, userSelector } from "@/shared/model/selectors";

const CheckoutTotal = ({ handleOrder }: CheckoutTotalProps) => {
    const { deliveryInfo } = useAppSelector(userSelector);
    const { priceView: { total } } = useAppSelector(cartSelector);

    return (
        <div className='flex flex-col gap-2'>
            <p className='flex items-center justify-between text-primary-black'>
                <span className='text-2xl font-bold'>Итого</span>
                <span className='text-2xl font-bold'>{getIntlPrice(total + (deliveryInfo?.deliveryPrice ?? 0))}</span>
            </p>
            <CheckoutControls handleOrder={handleOrder}/>
        </div>
    );
};

export default CheckoutTotal;