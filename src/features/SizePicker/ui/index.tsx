import React from "react";
import cn from "../../../shared/lib/classNames";
import { Props } from "../interfaces";
import { initialSizes } from "../../../shared/initialValues";
import { FORM_TYPES } from "../../../widgets/PriceBlock/lib/utils/formTypes";

const SizePicker: React.FC<Props> = ({ availableSizes, activeSize, initialPrice, handleChange }) => {
    return (
        <ul className='flex items-center w-full gap-2 p-1'>
            {initialSizes.map(({ size, additional }) => {
                const availableSizeIndex = availableSizes.findIndex((availableSize) => availableSize === size);
                const intlSize = new Intl.NumberFormat(navigator.language, { style: "unit", unit: "centimeter", unitDisplay: "short" }).format(size);

                return (
                    <li key={size} className='flex w-full'>
                        <label
                            className={cn(
                                "px-8 py-2 rounded-lg flex items-center justify-center w-full text-primary-black text-sm font-bold transition-shadow duration-200 ease-in-out",
                                availableSizeIndex !== -1 ? "cursor-pointer" : "opacity-50 cursor-default shadow-none",
                                size === activeSize && "bg-white shadow-md"
                            )}
                        >
                            {intlSize}
                            <input
                                type='radio'
                                name='size'
                                value={size}
                                className='sr-only'
                                disabled={availableSizeIndex === -1}
                                checked={size === activeSize}
                                {...(availableSizeIndex !== -1 && {
                                    onChange: () =>
                                        handleChange({
                                            type: FORM_TYPES.SET_SIZE,
                                            payload: {
                                                size,
                                                price: initialPrice + additional,
                                                param: "size",
                                                valueParam: availableSizeIndex,
                                            },
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