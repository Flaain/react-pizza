import React from "react";
import cn from "@/shared/lib/classNames";
import useTabSlider from "@/shared/hooks/useTabSlider";
import SliderTab from "@/shared/ui/SliderTab/ui";
import { TabSelectorProps } from "../../model/interfaces";

const TabSelectors: React.FC<TabSelectorProps> = ({ items, tabIndex, setTabIndex }) => {
    const { tabRef, tabLeft, tabWidth, setActiveTabIndex } = useTabSlider<HTMLButtonElement>(tabIndex);

    const handleSelect = (index: number) => {
        setTabIndex(index);
        setActiveTabIndex(index);
    };

    return (
        <div className='bg-primary-gray w-full p-1 rounded-lg grid grid-cols-2 gap-2 relative'>
            <SliderTab tabLeft={tabLeft} tabWidth={tabWidth} shadow={false}/>
            {items.map(({ name }, index) => (
                <button
                    ref={(element) => (tabRef.current[index] = element)}
                    key={name}
                    onClick={() => handleSelect(index)}
                    className={cn(
                        "text-primary-black font-medium py-3 px-10 z-10 rounded-lg flex items-center justify-center transition-colors duration-200 ease-in-out",
                        tabIndex !== index && "hover:bg-gray-200/50"
                    )}
                >
                    {name}
                </button>
            ))}
        </div>
    );
};

export default TabSelectors;