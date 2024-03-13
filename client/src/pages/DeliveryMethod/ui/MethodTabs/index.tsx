import Tabs from "@/shared/ui/Tabs/ui/ui";
import TabsList from "@/shared/ui/Tabs/ui/TabsList";
import TabsTrigger from "@/shared/ui/Tabs/ui/TabsTrigger";
import cn from "@/shared/lib/classNames";
import SliderTab from "@/shared/ui/SliderTab/ui";
import MethodList from "../MethodList";
import { useDeliveryMethodTabs } from "../../lib/hooks/useDeliveryMethodTabs";
import { DeliveryMethodType } from "../../model/interfaces";

const emptyComponents: Record<DeliveryMethodType, React.ReactNode> = {
    pickup: <p>Не удалось загрузить пункты самовывоза</p>,
    delivery: <p>Не удалось загрузить адреса доставки</p>,
};

const MethodTabs = () => {
    const {
        tab,
        initalTabs,
        addresses,
        currentInfo,
        handleMethodChange,
        handleAddressChange,
        slider: { tabLeft, tabRef, tabWidth },
    } = useDeliveryMethodTabs();

    return (
        <Tabs className='flex flex-col rounded-lg max-md:w-full gap-2 overflow-auto'>
            <div className='relative'>
                <SliderTab tabLeft={tabLeft} tabWidth={tabWidth} shadow={false} />
                <TabsList>
                    {initalTabs.map(({ value }, index) => (
                        <TabsTrigger
                            key={value}
                            onClick={() => handleMethodChange(index)}
                            ref={(element) => (tabRef.current[index] = element)}
                            className={cn(
                                "w-full cursor-default text-primary-black font-medium py-3 px-10 rounded-lg flex items-center justify-center transition-colors duration-200 ease-in-out",
                                tab !== index && "hover:bg-gray-200/50 cursor-pointer"
                            )}
                        >
                            <span className='z-50'>{value}</span>
                        </TabsTrigger>
                    ))}
                </TabsList>
            </div>
            {!addresses.length ? (
                emptyComponents[initalTabs[tab].method]
            ) : (
                <MethodList addresses={addresses} currentInfo={currentInfo} handleAddressChange={handleAddressChange} />
            )}
        </Tabs>
    );
};

export default MethodTabs;