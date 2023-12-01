import cn from "@/shared/lib/classNames";
import { SortPopupItemProps } from "../../model/interfaces";

const SortPopupItem: React.FC<SortPopupItemProps> = ({ sort, activeSort, handleSort, name }) => {
    return (
        <li
            onClick={() => handleSort(sort)}
            className={cn(
                "group flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-orange-50 hover:text-primary-orange transition-colors duration-200 ease-in-out",
                activeSort === sort && "bg-orange-50 text-primary-orange"
            )}
        >
            <svg
                className={cn(!sort.includes("-") && "rotate-180")}
                width='11'
                height='9'
                viewBox='0 0 11 9'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <g clipPath='url(#clip0_108298_2)'>
                    <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M0 0.5C0 0.776142 0.223858 1 0.5 1H10.5C10.7761 1 11 0.776142 11 0.5C11 0.223858 10.7761 0 10.5 0H0.5C0.223858 0 0 0.223858 0 0.5Z'
                        fill='#181818'
                        className={cn(
                            "group-hover:fill-primary-orange transition-colors duration-200 ease-in-out",
                            activeSort === sort && "fill-primary-orange"
                        )}
                    />
                    <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M3 4.5C3 4.77614 3.22386 5 3.5 5H10.5C10.7761 5 11 4.77614 11 4.5C11 4.22386 10.7761 4 10.5 4H3.5C3.22386 4 3 4.22386 3 4.5Z'
                        fill='#181818'
                        className={cn(
                            "group-hover:fill-primary-orange transition-colors duration-200 ease-in-out",
                            activeSort === sort && "fill-primary-orange"
                        )}
                    />
                    <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M6 8.5C6 8.77614 6.22386 9 6.5 9H10.5C10.7761 9 11 8.77614 11 8.5C11 8.22386 10.7761 8 10.5 8H6.5C6.22386 8 6 8.22386 6 8.5Z'
                        fill='#181818'
                        className={cn(
                            "group-hover:fill-primary-orange transition-colors duration-200 ease-in-out",
                            activeSort === sort && "fill-primary-orange"
                        )}
                    />
                </g>
            </svg>

            <span className='whitespace-nowrap'>{name}</span>
        </li>
    );
};

export default SortPopupItem;