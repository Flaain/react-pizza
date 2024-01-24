import cn from "@/shared/lib/classNames";
import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import { SortPopupItemProps } from "../../model/interfaces";

const SortPopupItem = ({ sort, activeSort, handleSort, name }: SortPopupItemProps) => {
    return (
        <li
            onClick={() => handleSort(sort)}
            className={cn(
                "group flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-orange-50 hover:text-primary-orange transition-colors duration-200 ease-in-out",
                activeSort.sort === sort && "bg-orange-50 text-primary-orange"
            )}
        >
            <img
                src={getImageUrl(activeSort.sort === sort ? "sort_inactive.svg" : "sort_color_dark.svg")}
                alt='sort'
                className={cn(!sort.includes("-") && "rotate-180")}
            />
            <span className='whitespace-nowrap'>{name}</span>
        </li>
    );
};

export default SortPopupItem;