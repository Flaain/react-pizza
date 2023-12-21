import { useAppSelector } from "@/shared/model/store";
import { cartSelector } from "@/shared/model/selectors";

const MinimazeCartInfo = () => {
    const { priceView: { totalItems, intl } } = useAppSelector(cartSelector);

    return (
        <div className='flex items-center gap-2'>
            <span className='text-lg font-medium text-primary-black'>Товара - {totalItems}</span>
            <span className='text-lg font-medium text-primary-black'>/</span>
            <span className='text-lg font-medium text-primary-black'>{intl}</span>
        </div>
    );
};

export default MinimazeCartInfo;
