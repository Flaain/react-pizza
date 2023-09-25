import React from "react";
import cn from "../../../shared/lib/classNames";
import { Props } from "../interfaces";
import { initialTypes } from "../../../shared/initialValues";
import { FORM_TYPES } from "../../../widgets/PriceBlock/lib/utils/formTypes";

const DoughPicker: React.FC<Props> = ({ availableTypes, type, handleChange }) => {
    return (
        <ul className='grid grid-cols-2 gap-2 w-full p-1'>
            {initialTypes.map((name, index) => {
                const availableType = availableTypes.some((typeIndex) => typeIndex === index);

                return (
                    <li key={name} className='flex'>
                        <label
                            className={cn(
                                "px-9 py-2 rounded-lg flex items-center justify-center w-full text-primary-black text-sm font-bold transition-shadow duration-200 ease-in-out",
                                availableType ? "cursor-pointer" : "opacity-50 cursor-default",
                                type === index && "bg-white shadow-md"
                            )}
                        >
                            {name}
                            <input
                                type='radio'
                                name='type'
                                className='sr-only'
                                value={name}
                                checked={type === index}
                                disabled={!availableType}
                                {...(availableType && { onChange: () => handleChange({ type: FORM_TYPES.SET_TYPE, payload: { type: index } }) })}
                            />
                        </label>
                    </li>
                );
            })}
        </ul>
    );
};

export default DoughPicker;