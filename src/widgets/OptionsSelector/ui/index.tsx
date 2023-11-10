import React from "react";
import DoughPicker from "../../../features/DoughPicker/ui";
import SizePicker from "../../../features/SizePicker/ui";
import useViewport from "../../../shared/hooks/useViewport";
import { Props } from "../interfaces";

const OptionsSelector: React.FC<Props> = (props) => {
    const { width } = useViewport();

    return (
        <div className='flex flex-col bg-primary-gray rounded-lg max-md:w-full'>
            <DoughPicker {...props} width={width} />
            <SizePicker {...props} width={width} />
        </div>
    );
};

export default OptionsSelector;