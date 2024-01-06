import TabContentItem from "../TabContentItem";
import { motion } from "framer-motion";
import { TabContentListProps } from "../../model/interfaces";

const TabContentList = ({ activeTab, currentInfo, handleChange }: TabContentListProps) => {
    return (
        <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: "-50%" }}
            className='flex flex-col gap-5 overflow-auto h-full'
        >
            {activeTab.addresses.map(({ address, rating, deliveryPrice }) => (
                <TabContentItem
                    {...{
                        key: address,
                        address,
                        method: activeTab.method,
                        currentInfo,
                        handleChange,
                        deliveryPrice,
                        rating,
                    }}
                />
            ))}
        </motion.ul>
    );
};

export default TabContentList;