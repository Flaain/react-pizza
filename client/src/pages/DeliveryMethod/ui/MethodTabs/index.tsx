import cn from "@/shared/lib/classNames";
import MethodTabContent from "../MethodTabContent";
import { motion } from "framer-motion";
import { useDeliveryMethodTabs } from "../../lib/hooks/useDeliveryMethodTabs";

const MethodTabs = () => {
    const {
        tab,
        initalTabs,
        addresses,
        currentInfo,
        handleMethodChange,
        handleAddressChange,
        handleSave,
        isSaveBtnDisabled,
    } = useDeliveryMethodTabs();

    return (
        <div className='flex flex-col rounded-lg max-md:w-full h-full gap-2 overflow-auto'>
            <div className='relative'>
                <ul className='bg-primary-gray w-full p-1 rounded-lg grid grid-cols-2 gap-2 relative'>
                    {initalTabs.map(({ value }, index) => (
                        <li
                            key={value}
                            onClick={() => handleMethodChange(index)}
                            className={cn(
                                "w-full relative cursor-default text-primary-black font-medium py-3 px-10 rounded-lg flex items-center justify-center transition-colors duration-200 ease-in-out",
                                tab !== index && "hover:bg-gray-200/50 cursor-pointer"
                            )}
                        >
                            {tab === index && (
                                <motion.span
                                    layoutId='options-selector'
                                    className='absolute inset-0 z-10 bg-white rounded-lg'
                                    transition={{ ease: "easeInOut", duration: 0.3 }}
                                />
                            )}
                            <span className='z-50'>{value}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <MethodTabContent
                addresses={addresses}
                currentInfo={currentInfo}
                handleAddressChange={handleAddressChange}
                method={initalTabs[tab].method}
                handleSave={handleSave}
                isSaveBtnDisabled={isSaveBtnDisabled}
            />
        </div>
    );
};

export default MethodTabs;