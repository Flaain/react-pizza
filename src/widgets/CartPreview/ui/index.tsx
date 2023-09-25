import getImageUrl from "../../../shared/lib/helpers/getImageUrl";
import { Link } from "react-router-dom";
import { useCart } from "../../../shared/hooks/useCart";

const CartPreview = () => {
    const { price: { intl }, totalItems } = useCart();

    return (
        <Link
            to='cart'
            className='py-2 px-5 rounded-full bg-primary-orange text-white flex items-center gap-3 hover:bg-secondary-orange transition-colors duration-200 ease-in-out'
        >
            <span className='font-medium'>{intl}</span>
            <span className='bg-gray-200 w-[1px] h-[20px] opacity-50'></span>
            <span className='flex items-center gap-2 font-medium'>
                <img src={getImageUrl("cart.svg")} alt='cart logo' />
                {totalItems}
            </span>
        </Link>
    );
};

export default CartPreview;