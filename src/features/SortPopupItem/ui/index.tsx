import React from "react";
import cn from "../../../shared/lib/classNames";
import { Props } from "../interfaces";

const SortPopupItem: React.FC<Props> = ({ name, sort, index, currentSort, handleSort }) => {
    return (
        <li
            onClick={() => handleSort(sort, index)}
            className={cn(
                "p-2 rounded cursor-pointer hover:bg-primary-orange hover:text-white transition-colors duration-200 ease-in-out",
                currentSort === index && "bg-primary-orange text-white"
            )}
        >
            <span className='whitespace-nowrap'>{name}</span>
        </li>
    );
};

export default SortPopupItem;