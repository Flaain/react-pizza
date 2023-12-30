import React from "react";
import OptionsList from "./OptionsList";
import { OptionsSelectorProps } from "../model/interfaces";
import { initialSizes, initialTypes } from "@/shared/config/constants";
import { ProductSelectorTypes } from "@/entities/Product/model/interfaces";

const OptionsSelector: React.FC<OptionsSelectorProps> = (props) => {
    return (
        <div className='flex flex-col bg-primary-gray rounded-lg max-md:w-full'>
            <OptionsList
                data={props.types}
                dispatch={props.handleChange}
                initial={initialTypes}
                segmentType={ProductSelectorTypes.SET_TYPE}
                stateProperty='type'
                state={props.state}
                />
            <OptionsList
                classNames='grid grid-cols-3 gap-2 p-1'
                data={props.sizes}
                dispatch={props.handleChange}
                initial={initialSizes}
                segmentType={ProductSelectorTypes.SET_SIZE}
                stateProperty='size'
                state={props.state}
            />
        </div>
    );
};

export default OptionsSelector;