import React from "react";
import cn from "../../../shared/lib/classNames";
import { Props } from "../interfaces";
import { initialSizes } from "../../../shared/initialValues";
import { FORM_TYPES } from "../../../widgets/PriceBlock/lib/utils/formTypes";

const SizePicker: React.FC<Props> = ({ availableSizes, size, initialPrice, handleChange }) => {
    return (
        <ul className='flex items-center w-full gap-2 p-1'>
            {initialSizes.map(({ size: _size, additional }) => {
                const availableSize = availableSizes.some((availableSize) => _size === availableSize);
                const intlSize = new Intl.NumberFormat(navigator.language, { style: "unit", unit: "centimeter", unitDisplay: "short" }).format(_size);

                return (
                    <li key={_size} className='flex w-full'>
                        <label
                            className={cn(
                                "px-8 py-2 rounded-lg flex items-center justify-center w-full text-primary-black text-sm font-bold transition-shadow duration-200 ease-in-out",
                                availableSize ? "cursor-pointer" : "opacity-50 cursor-default shadow-none",
                                _size === size && "bg-white shadow-md"
                            )}
                        >
                            {intlSize}
                            <input
                                type='radio'
                                name='size'
                                value={_size}
                                className='sr-only'
                                disabled={!availableSize}
                                checked={_size === size}
                                {...(availableSize && {
                                    onChange: () =>
                                        handleChange({
                                            type: FORM_TYPES.SET_SIZE,
                                            payload: { size: _size, price: initialPrice + additional },
                                        }),
                                })}
                            />
                        </label>
                    </li>
                );
            })}
        </ul>
    );
};

export default SizePicker;