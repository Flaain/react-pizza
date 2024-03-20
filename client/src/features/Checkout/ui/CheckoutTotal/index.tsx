import CheckoutControls from "../CheckoutControls";
import getIntlPrice from "@/shared/lib/helpers/getIntlPrice";
import { useAppSelector } from "@/shared/model/store";
import { cartSelector, userSelector } from "@/shared/model/selectors";
import AnimatedNumber from "@/shared/ui/AnimatedNumber/ui/ui";
import Typography from "@/shared/ui/Typography/ui/ui";

const CheckoutTotal = () => {
    const { deliveryInfo } = useAppSelector(userSelector);
    const { priceView: { totalPrice } } = useAppSelector(cartSelector);

    return (
        <div className='flex flex-col gap-2'>
            <Typography as="p" className='flex items-center justify-between text-primary-black'>
                <Typography size='2xl' weight='bold'>
                    Итого
                </Typography>
                <AnimatedNumber
                    value={totalPrice + (deliveryInfo?.deliveryPrice ?? 0)}
                    cb={(price) => getIntlPrice(price)}
                    size='2xl'
                    weight='bold'
                />
            </Typography>
            <CheckoutControls />
        </div>
    );
};

export default CheckoutTotal;