import { useCart } from "../../../shared/hooks/useCart";

const MinimazeCartInfo= () => {
    const { price: { intl }, totalItems } = useCart();
    return (
        <div className='flex items-center gap-2'>
            <span className='text-lg font-medium text-primary-black'>Товара - {totalItems}</span>
            <span className='text-lg font-medium text-primary-black'>/</span>
            <span className='text-lg font-medium text-primary-black'>{intl}</span>
        </div>
    );
};

export default MinimazeCartInfo;