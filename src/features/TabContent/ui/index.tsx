import React from "react";
import TabContentItem from "../../TabContentItem/ui";
import { Props } from "../interfaces";

const TabContent: React.FC<Props> = ({ activeTab, indexTab, currentInfo, setCurrentInfo, setDeliveryInfo, deliveryInfo }) => {
    const handleChange = (address: string, rating: number | undefined, deliveryPrice: number | undefined) => {
        setCurrentInfo({
            address,
            type: activeTab.name,
            ...(rating && { rating }),
            ...(deliveryPrice && { deliveryPrice }),
        });
    };

    return (
        <ul className='flex flex-col gap-5 overflow-auto h-full'>
            {activeTab.addresses.map(({ address, rating, deliveryPrice }, index) => (
                <TabContentItem
                    key={`${address} - ${index}`}
                    {...{
                        activeTab,
                        indexTab,
                        address,
                        currentInfo,
                        deliveryInfo,
                        setCurrentInfo,
                        setDeliveryInfo,
                        handleChange,
                        deliveryPrice,
                        rating,
                    }}
                />
            ))}
        </ul>
    );
};

export default TabContent;