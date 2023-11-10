import { useSelector } from "react-redux";
import { RootState } from "../../../app/redux/store";

const MinimazeCartInfo = () => {
    const { priceView: { totalItems, intl } } = useSelector(({ cart }: RootState) => cart);
    return (
        <div className='flex items-center gap-2'>
            <span className='text-lg font-medium text-primary-black'>Товара - {totalItems}</span>
            <span className='text-lg font-medium text-primary-black'>/</span>
            <span className='text-lg font-medium text-primary-black'>{intl}</span>
        </div>
    );
};

export default MinimazeCartInfo;