import React from "react";
import cn from "../../../shared/lib/classNames";
import { Props } from "../interfaces";
import { initialTypes } from "../../../shared/initialValues";
import { FORM_TYPES } from "../../../widgets/PriceBlock/lib/utils/formTypes";

const DoughPicker: React.FC<Props> = ({ availableTypes, activeType, handleChange }) => {
    const [activeTabIndex, setActiveTabIndex] = React.useState(activeType);
    const [elementWidth, setElementWidth] = React.useState<number | null>(null);
    const [elementOffsetLeft, setElementOffsetLeft] = React.useState<number | null>(null);
    
    const tabsRef = React.useRef<Array<HTMLLabelElement | null>>([]);

    React.useEffect(() => {
        const { offsetLeft, clientWidth } = tabsRef.current[activeTabIndex] as HTMLLabelElement

        setElementOffsetLeft(offsetLeft);
        setElementWidth(clientWidth);
    }, [activeTabIndex])

    React.useEffect(() => setActiveTabIndex(activeType), [availableTypes, activeType])

    const handleTypeChange = (index: number, availableType: number) => {
        handleChange({ type: FORM_TYPES.SET_TYPE, payload: { type: index, param: "type", valueParam: availableType } })
        setActiveTabIndex(index)
    }

    return (
        <div className='relative z-10'>
            <span
                className='absolute bottom-0 top-0 -z-10 flex transition-all duration-300 py-1'
                {...(elementOffsetLeft && elementWidth && { style: { left: elementOffsetLeft, width: elementWidth } })}
            >
                <span className='h-full w-full rounded-lg bg-white shadow-md box-border' />
            </span>
            <ul className='grid grid-cols-2 gap-2 w-full p-1'>
                {initialTypes.map((name, index) => {
                    const availableTypeIndex = availableTypes.findIndex((availableType) => availableType === index);

                    return (
                        <li key={name} className='flex'>
                            <label
                                ref={(element) => (tabsRef.current[index] = element)}
                                className={cn(
                                    "px-9 py-2 rounded-lg flex items-center justify-center w-full text-primary-black text-sm font-bold transition-shadow duration-200 ease-in-out",
                                    availableTypeIndex !== -1 ? "cursor-pointer" : "opacity-50 cursor-default",
                                )}
                            >
                                {name}
                                <input
                                    type='radio'
                                    name='type'
                                    className='sr-only'
                                    value={name}
                                    checked={activeType === index}
                                    disabled={availableTypeIndex === -1}
                                    {...(availableTypeIndex !== -1 && { onChange: () => handleTypeChange(index, availableTypeIndex)})}
                                />
                            </label>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default DoughPicker;