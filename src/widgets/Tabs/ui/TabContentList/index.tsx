import TabContentItem from "../TabContentItem";
import { TabContentListProps } from "../../model/interfaces";

const TabContentList: React.FC<TabContentListProps> = ({ activeTab, currentInfo, handleChange }) => {
    return (
        <ul className='flex flex-col gap-5 overflow-auto h-full'>
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
        </ul>
    );
};

export default TabContentList;