import React from "react";
import SizePickerItem from "../../SizePickerItem/ui";
import { Props } from "../interfaces";
import { initialSizes } from "../../../shared/config/constants/initialValues";
import { ActionTypes } from "../../../widgets/PriceBlock/lib/utils/formTypes";

const SizePicker: React.FC<Props> = ({ activeItem, state, handleChange, width }) => {
    const [activeTabIndex, setActiveTabIndex] = React.useState(initialSizes.findIndex(({ size }) => size === state.size));    
    const [tabUnderlineWidth, setTabUnderlineWidth] = React.useState<number | null>(null);
    const [tabUnderlineLeft, setTabUnderlineLeft] = React.useState<number | null>(null);
    
    const tabsRef = React.useRef<Array<HTMLLabelElement | null>>([]);

    React.useEffect(() => {
        const { offsetLeft, clientWidth } = tabsRef.current[activeTabIndex] as HTMLLabelElement;

        setTabUnderlineLeft(offsetLeft);
        setTabUnderlineWidth(clientWidth);
    }, [activeTabIndex, width])

    React.useEffect(() => setActiveTabIndex(initialSizes.findIndex(({ size }) => size === state.size)), [activeItem, state])

    const handleSizeChange = (size: number, index: number, availableSizeIndex: number) => {
        handleChange({
            type: ActionTypes.SET_SIZE,
            payload: {
                type: state.type,
                size,
                price: activeItem.price + initialSizes[index].additional,
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
                    return (
                        <SizePickerItem {...{ key: size, activeItem, state, handleSizeChange, index, size, tabsRef }}/>
                    );
                })}
            </ul>
        </div>
    );
};

export default SizePicker;