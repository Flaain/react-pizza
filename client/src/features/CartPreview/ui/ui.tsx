import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import AnimatedNumber from "@/shared/ui/AnimatedNumber/ui/ui";
import getIntlPrice from "@/shared/lib/helpers/getIntlPrice";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/shared/model/store";
import { cartSelector, userSelector } from "@/shared/model/selectors";
import { routerList } from "@/shared/config/constants";

const CartPreview = () => {
    const { priceView: { totalItems, totalPrice }, cartLoading } = useAppSelector(cartSelector);
    const { isAuthInProgress } = useAppSelector(userSelector);

    return (
        <>
            {isAuthInProgress || cartLoading ? (
                <span className='bg-gray-100 w-[150px] h-[40px] space-y-5 rounded-full relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></span>
            ) : (
                <Link
                    to={routerList.CART.main}
                    className='py-2 px-5 box-border max-sm:basis-1/2 min-w-[150px] rounded-full bg-primary-orange text-white flex justify-center items-center gap-3 hover:bg-secondary-orange transition-colors duration-200 ease-in-out'
                >
                    <AnimatedNumber
                        value={totalPrice}
                        cb={(value) => getIntlPrice(value)}
                        weight='medium'
                        variant='default'
                    />
                    <span className='bg-gray-200 w-[1px] h-[20px] opacity-50'></span>
                    <span className='flex items-center gap-2 font-medium'>
                        <img src={getImageUrl("cart.svg")} alt='cart logo' />
                        {totalItems}
                    </span>
                </Link>
            )}
        </>
    );
};

export default CartPreview;
