import cn from "@/shared/lib/classNames";
import useTabSlider from "@/shared/hooks/useTabSlider";
import SliderTab from "@/shared/ui/SliderTab/ui";
import { TabSelectorProps } from "../../model/interfaces";

const TabSelectors = ({
    items,
    selectedDeliveryMethodIndex,
    setSelectedDeliveryMethodIndex,
    setSearchParams,
}: TabSelectorProps) => {
    const { tabRef, tabLeft, tabWidth, setActiveTabIndex } =
        useTabSlider<HTMLButtonElement>(selectedDeliveryMethodIndex);

    const handleSelect = (index: number) => {
        setSearchParams(
            (prevState) => {
                prevState.set("method", String(index));
                return prevState;
            },
            { replace: true }
        );
        setSelectedDeliveryMethodIndex(index);
        setActiveTabIndex(index);
    };

    return (
        <div className={`bg-primary-gray w-full p-1 rounded-lg grid grid-cols-${items.length} gap-2 relative`}>
            <SliderTab tabLeft={tabLeft} tabWidth={tabWidth} shadow={false} />
            {items.map(({ title }, index) => (
                <button
                    ref={(element) => (tabRef.current[index] = element)}
                    key={title}
                    onClick={() => handleSelect(index)}
                    className={cn(
                        "text-primary-black font-medium py-3 px-10 z-10 rounded-lg flex items-center justify-center transition-colors duration-200 ease-in-out",
                        selectedDeliveryMethodIndex !== index && "hover:bg-gray-200/50"
                    )}
                >
                    {title}
                </button>
            ))}
        </div>
    );
};

export default TabSelectors;