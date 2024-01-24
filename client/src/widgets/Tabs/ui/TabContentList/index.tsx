import TabContentItem from "../TabContentItem";
import { TabContentListProps } from "../../model/interfaces";

const TabContentList = ({ elements, method, currentInfo, handleChange }: TabContentListProps) => {
    return (
        <ul className='flex flex-col gap-5 overflow-auto h-full'>
            {elements.map(({ address, rating, deliveryPrice }) => (
                <TabContentItem
                    {...{
                        key: address,
                        address,
                        method,
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