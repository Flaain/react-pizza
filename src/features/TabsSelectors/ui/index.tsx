import React from "react";
import cn from "../../../shared/lib/classNames";
import { Props } from "../interfaces";

const TabsSelectors: React.FC<Props> = ({ items, indexTab, setIndexTab, setShowAddForm }) => {
    const handleClick = (index: number) => {
        setIndexTab(index);
        index !== indexTab && setShowAddForm(false);
    };

    return (
        <div className='bg-primary-gray w-full p-1 rounded-lg grid grid-cols-2'>
            {items.map(({ name }, index) => (
                <button
                    key={name}
                    onClick={() => handleClick(index)}
                    className={cn(
                        "text-primary-black font-medium py-3 px-10 rounded-lg flex items-center justify-center",
                        indexTab === index && "bg-white"
                    )}
                >
                    {name}
                </button>
            ))}
        </div>
    );
};

export default TabsSelectors;