import TabContentItem from "../TabContentItem";
import { TabContentListProps } from "../../model/interfaces";

const TabContentList = ({ elements, method, currentInfo, handleChange }: TabContentListProps) => {
    return (
        <ul className='flex flex-col gap-5 overflow-auto h-full'>
            {elements.map((element) => (
                <TabContentItem
                    key={"id" in element ? element.id : element._id}
                    address={element}
                    method={method}
                    currentInfo={currentInfo}
                    handleChange={handleChange}
                />
            ))}
        </ul>
    );
};

export default TabContentList;