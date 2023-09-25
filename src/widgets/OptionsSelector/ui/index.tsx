import React from "react";
import DoughPicker from "../../../features/DoughPicker/ui";
import SizePicker from "../../../features/SizePicker/ui";
import { Props } from "../interfaces";

const OptionsSelector: React.FC<Props> = ({ availableTypes, availableSizes, size, type, initialPrice, handleChange }) => {
    return (
        <div className='flex flex-col bg-primary-gray rounded-lg'>
            <DoughPicker {...{ type, availableTypes, handleChange }} />
            <SizePicker {...{ size, availableSizes, initialPrice, handleChange }} />
        </div>
    );
};

export default OptionsSelector;