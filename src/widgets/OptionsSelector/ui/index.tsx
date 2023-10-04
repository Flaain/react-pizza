import React from "react";
import DoughPicker from "../../../features/DoughPicker/ui";
import SizePicker from "../../../features/SizePicker/ui";
import { Props } from "../interfaces";

const OptionsSelector: React.FC<Props> = ({ availableTypes, availableSizes, activeSize, activeType, initialPrice, handleChange }) => {
    return (
        <div className='flex flex-col bg-primary-gray rounded-lg'>
            <DoughPicker {...{ activeType, availableTypes, handleChange }} />
            <SizePicker {...{ activeSize, availableSizes, initialPrice, handleChange }} />
        </div>
    );
};

export default OptionsSelector;