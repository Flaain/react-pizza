import React from "react";
import cn from "../../../shared/lib/classNames";
import { Props } from "../interfaces";

const SizePickerItem: React.FC<Props> = ({ activeItem, state, handleSizeChange, index, size, tabsRef }) => {
    const availableSizeIndex = activeItem.sizes.findIndex((availableSize) => availableSize === size);
    const intlSize = new Intl.NumberFormat(navigator.language, { style: "unit", unit: "centimeter", unitDisplay: "short" }).format(size);

    return (
        <li className='flex w-full'>
            <label
                ref={(element) => (tabsRef.current[index] = element)}
                className={cn(
                    "px-8 py-2 rounded-lg whitespace-nowrap flex items-center justify-center w-full text-primary-black text-sm max-md:text-base font-bold transition-shadow duration-200 ease-in-out",
                    availableSizeIndex !== -1 ? "cursor-pointer" : "opacity-50 cursor-default shadow-none"
                )}
            >
                {intlSize}
                <input
                    type='radio'
                    name='size'
                    value={size}
                    className='sr-only'
                    disabled={availableSizeIndex === -1}
                    checked={size === state.size}
                    {...(availableSizeIndex !== -1 && { onChange: () => handleSizeChange(size, index, availableSizeIndex) })}
                />
            </label>
        </li>
    );
};

export default SizePickerItem;