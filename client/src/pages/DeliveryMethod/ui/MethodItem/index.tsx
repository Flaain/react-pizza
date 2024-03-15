import cn from "@/shared/lib/classNames";
import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import { MethodItemProps } from "../../model/interfaces";

const MethodItem = ({ address, handleAddressChange, currentInfo, ...rest }: MethodItemProps) => {
    const isSelected = currentInfo?.address.id === address.id;

    return (
        <li {...rest} className='flex relative'>
            <label
                title={address.line}
                className={cn(
                    "flex-1 p-5 truncate rounded-lg border border-solid cursor-pointer hover:border-primary-orange transition-colors duration-200 ease-in-out",
                    isSelected ? "border-primary-orange" : "border-primary-gray"
                )}
            >
                <div className='flex flex-col gap-2'>
                    <p className='truncate font-medium'>{`${address.city}, ${address.state}, ${address.line}, ${address.postal_code}`}</p>

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
                    checked={!!isSelected}
                    onChange={() => handleAddressChange({ address })}
                />
            </label>
            {/* {method === "delivery" && (
                <div className='absolute right-0 top-0'>
                    <ul>
                        <li>Удалить</li>
                        <li>Редактировать</li>
                    </ul>
                </div>
            )} */}
        </li>
    );
};

export default MethodItem;