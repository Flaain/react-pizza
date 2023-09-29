import React from "react";
import SortPopupList from "../../../widgets/SortPopupList/ui";
import saveToLocalStorage from "../../../shared/lib/helpers/saveToLocalStorage";
import cn from "../../../shared/lib/classNames";
import getSortedArr from "../../../shared/lib/helpers/getSortedArr";
import { Props } from "../interfaces";
import { AppContext } from "../../../app/context";
import { SORT_INDEX_KEY, initialSortNames } from "../../../shared/initialValues";

const SortPopup: React.FC<Props> = ({ names, currentSort, setCurrentSort }) => {
    const { setFilteredPizzas } = React.useContext(AppContext);

    const [opened, setOpened] = React.useState(false);

    const listRef = React.useRef<HTMLUListElement>(null);
    const spanRef = React.useRef<HTMLSpanElement>(null);

    React.useEffect(() => {
        const handleOutsideClick = ({ target }: MouseEvent) => {
            target !== listRef.current && target !== spanRef.current && setOpened(false);
        };

        const handleKeyup = ({ key }: KeyboardEvent) => {
            if (key === "Escape") {
                setOpened(false);
            }
        };

        document.addEventListener("keyup", handleKeyup);
        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.addEventListener("keyup", handleKeyup);
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    const handleSort = (sortType: string, index: number) => {
        const sortDirection = sortType.includes("-") ? -1 : 1;
        const property = sortType.replace('-', ''); 

        setCurrentSort(index);
        setFilteredPizzas((prevState) => [...prevState.sort((a, b) => getSortedArr(a, b, sortDirection, property))]);
        saveToLocalStorage({ key: SORT_INDEX_KEY, data: index });
    };

    return (
        <div className='flex flex-col gap-5 relative'>
            <p className='flex items-center gap-2'>
                Сортировать по
                <span
                    ref={spanRef}
                    className='flex py-2 px-3 rounded-lg bg-orange-50 items-center gap-2 text-primary-orange font-medium cursor-pointer select-none'
                    onClick={() => setOpened((prevState) => !prevState)}
                >
                    <svg
                        className={cn('pointer-events-none', !initialSortNames[currentSort].sort.includes("-") && "rotate-180")}
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
                                fill='#FE5F1E'
                            />
                            <path
                                fillRule='evenodd'
                                clipRule='evenodd'
                                d='M3 4.5C3 4.77614 3.22386 5 3.5 5H10.5C10.7761 5 11 4.77614 11 4.5C11 4.22386 10.7761 4 10.5 4H3.5C3.22386 4 3 4.22386 3 4.5Z'
                                fill='#FE5F1E'
                            />
                            <path
                                fillRule='evenodd'
                                clipRule='evenodd'
                                d='M6 8.5C6 8.77614 6.22386 9 6.5 9H10.5C10.7761 9 11 8.77614 11 8.5C11 8.22386 10.7761 8 10.5 8H6.5C6.22386 8 6 8.22386 6 8.5Z'
                                fill='#FE5F1E'
                            />
                        </g>
                        <defs>
                            <clipPath id='clip0_108298_2'>
                                <rect width='11' height='9' fill='white' />
                            </clipPath>
                        </defs>
                    </svg>
                    {names[currentSort].name}
                </span>
            </p>
            {opened && <SortPopupList {...{ currentSort, handleSort, names, ref: listRef }} />}
        </div>
    );
};

export default SortPopup;