import cn from "@/shared/lib/classNames";
import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import { TabItemProps } from "../../model/interfaces";

const TabContentItem = ({ address, method, currentInfo, deliveryPrice, handleChange }: TabItemProps) => {
    const isSelected = (currentInfo && ("id" in currentInfo.address ? currentInfo.address.id : currentInfo.address._id)) === ("id" in address ? address.id : address._id)
    return (
        <li className='flex relative'>
            <label
                title={address.line}
                className={cn(
                    "flex-1 p-5 truncate rounded-lg border border-solid cursor-pointer hover:border-primary-orange transition-colors duration-200 ease-in-out",
                    isSelected ? "border-primary-orange" : "border-primary-gray"
                )}
            >
                <div className='flex flex-col gap-2'>
                    <p className='truncate font-medium'>{address.line}</p>
                    {"rating" in address && (
                        <span className='flex items-center gap-2 font-medium text-primary-black'>
                            <img
                                src={getImageUrl("rating.svg")}
                                alt={`Рейтинг - ${address.rating}`}
                                width={14}
                                height={14}
                            />
                            {address.rating}
                        </span>
                    )}
                </div>
                <input
                    type='radio'
                    name='address'
                    className='sr-only'
                    autoComplete='off'
                    checked={isSelected}
                    onChange={() => handleChange({ address, method, deliveryPrice })}
                />
            </label>
        </li>
    );
};

export default TabContentItem;