import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import cn from "@/shared/lib/classNames";
import { PaymentMainItemProps } from "@/widgets/PaymentModal/model/interfaces";

const PaymentMainItem = ({ title, img, menu, method, currentInfo, handleChange }: PaymentMainItemProps) => {
    return (
        <li key={title} className='flex'>
            <label
                title={title}
                className={cn(
                    "flex items-center gap-3 w-full p-5 truncate rounded-lg border border-solid cursor-pointer hover:border-primary-orange transition-colors duration-200 ease-in-out",
                    currentInfo?.method && currentInfo.method === method
                        ? "border-primary-orange"
                        : "border-primary-gray"
                )}
            >
                {img && <img src={getImageUrl(img)} alt={title} />}
                {title}
                <input
                    type='radio'
                    name='method'
                    className='sr-only'
                    checked={currentInfo?.method ? (currentInfo?.method === method) : false}
                    onChange={() => handleChange(menu, method)}
                />
            </label>
        </li>
    );
};

export default PaymentMainItem;