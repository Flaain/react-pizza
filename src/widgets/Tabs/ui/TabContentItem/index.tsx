import cn from "@/shared/lib/classNames";
import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import { TabItemProps } from "../../model/interfaces";

const TabContentItem = ({ address, method, currentInfo, deliveryPrice, rating, handleChange }: TabItemProps) => {
    return (
        <li className='flex relative'>
            <label
                title={address}
                className={cn(
                    "flex-1 p-5 truncate rounded-lg border border-solid cursor-pointer hover:border-primary-orange transition-colors duration-200 ease-in-out",
                    currentInfo?.address === address ? "border-primary-orange" : "border-primary-gray"
                )}
            >
                <div className='flex flex-col gap-2'>
                    <p className='truncate font-medium'>{address}</p>
                    {rating && (
                        <span className='flex items-center gap-2 font-medium text-primary-black'>
                            <img src={getImageUrl("rating.svg")} alt={`Рейтинг - ${rating}`} width={14} height={14} />
                            {rating}
                        </span>
                    )}
                </div>
                <input
                    type='radio'
                    name='address'
                    className='sr-only'
                    checked={currentInfo?.address === address}
                    onChange={() =>
                        handleChange({
                            address,
                            ...(rating && { rating }),
                            ...(deliveryPrice && { deliveryPrice }),
                            method,
                        })
                    }
                />
            </label>
        </li>
    );
};

export default TabContentItem;