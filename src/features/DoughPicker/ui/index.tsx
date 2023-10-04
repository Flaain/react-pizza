import React from "react";
import cn from "../../../shared/lib/classNames";
import { Props } from "../interfaces";
import { initialTypes } from "../../../shared/initialValues";
import { FORM_TYPES } from "../../../widgets/PriceBlock/lib/utils/formTypes";

const DoughPicker: React.FC<Props> = ({ availableTypes, activeType, handleChange }) => {
    return (
        <ul className='grid grid-cols-2 gap-2 w-full p-1'>
            {initialTypes.map((name, index) => {
                const availableType = availableTypes.findIndex((value) => value === index);

                return (
                    <li key={name} className='flex'>
                        <label
                            className={cn(
                                "px-9 py-2 rounded-lg flex items-center justify-center w-full text-primary-black text-sm font-bold transition-shadow duration-200 ease-in-out",
                                availableType !== -1 ? "cursor-pointer" : "opacity-50 cursor-default",
                                activeType === index && "bg-white shadow-md"
                            )}
                        >
                            {name}
                            <input
                                type='radio'
                                name='type'
                                className='sr-only'
                                value={name}
                                checked={activeType === index}
                                disabled={availableType === -1}
                                {...(availableType !== -1 && {
                                    onChange: () =>
                                        handleChange({
                                            type: FORM_TYPES.SET_TYPE,
                                            payload: { type: index, param: "type", valueParam: availableType },
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

export default DoughPicker;