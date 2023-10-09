import React from "react";
import cn from "../../../shared/lib/classNames";
import { Props } from "../interfaces";
import { initialSizes } from "../../../shared/initialValues";
import { FORM_TYPES } from "../../../widgets/PriceBlock/lib/utils/formTypes";

const SizePicker: React.FC<Props> = ({ availableSizes, activeSize, initialPrice, handleChange }) => {
    const [activeTabIndex, setActiveTabIndex] = React.useState(initialSizes.findIndex(({ size }) => size === activeSize));    
    const [tabUnderlineWidth, setTabUnderlineWidth] = React.useState<number | null>(null);
    const [tabUnderlineLeft, setTabUnderlineLeft] = React.useState<number | null>(null);
    
    const tabsRef = React.useRef<Array<HTMLLabelElement | null>>([]);

    React.useEffect(() => {
        const { offsetLeft, clientWidth } = tabsRef.current[activeTabIndex] as HTMLLabelElement;
        
        setTabUnderlineLeft(offsetLeft);
        setTabUnderlineWidth(clientWidth);
    }, [activeTabIndex])

    React.useEffect(() => setActiveTabIndex(initialSizes.findIndex(({ size }) => size === activeSize)), [availableSizes, activeSize]);

    const handleSizeChange = (size: number, index: number, availableSizeIndex: number) => {
        handleChange({
            type: FORM_TYPES.SET_SIZE,
            payload: {
                size,
                price: initialPrice + initialSizes[index].additional,
                param: "size",
                valueParam: availableSizeIndex,
            },
        });
        setActiveTabIndex(index);
    };

    return (
        <div className='relative overflow-hidden z-10'>
            <span
                className='absolute bottom-0 top-0 -z-10 flex transition-all duration-300 py-1'
                {...(tabUnderlineWidth && tabUnderlineLeft && { style: { left: tabUnderlineLeft, width: tabUnderlineWidth } })}
            >
                <span className='h-full w-full rounded-lg bg-white shadow-md box-border' />
            </span>
            <ul className='flex items-center w-full gap-2 p-1'>
                {initialSizes.map(({ size }, index) => {
                    const availableSizeIndex = availableSizes.findIndex((availableSize) => availableSize === size);
                    const intlSize = new Intl.NumberFormat(navigator.language, { style: "unit", unit: "centimeter", unitDisplay: "short" }).format(size);

                    return (
                        <li key={size} className='flex w-full'>
                            <label
                                ref={(element) => (tabsRef.current[index] = element)}
                                className={cn(
                                    "px-8 py-2 rounded-lg flex items-center justify-center w-full text-primary-black text-sm font-bold transition-shadow duration-200 ease-in-out",
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
                                    checked={size === activeSize}
                                    {...(availableSizeIndex !== -1 && { onChange: () => handleSizeChange(size, index, availableSizeIndex) })}
                                />
                            </label>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default SizePicker;