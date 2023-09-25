import SortPopupList from "../../../widgets/SortPopupList/ui";
import saveToLocalStorage from "../../../shared/lib/helpers/saveToLocalStorage";
import React from "react";
import { Pizza } from "../../../shared/api/interfaces";
import { Props } from "../interfaces";
import { AppContext } from "../../../app/context";
import { SORT_INDEX_KEY } from "../../../shared/initialValues";

const SortPopup: React.FC<Props> = ({ names, currentSort, setCurrentSort }) => {
    const { setFilteredPizzas } = React.useContext(AppContext);

    const [opened, setOpened] = React.useState(false);

    const listRef = React.useRef<HTMLUListElement>(null);
    const spanRef = React.useRef<HTMLSpanElement>(null);

    React.useEffect(() => {
        const handleOutsideClick = ({ target }: MouseEvent) => {
            target !== listRef.current && target !== spanRef.current && setOpened(false);
        };
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, [opened]);

    const handleSort = (sortType: string, index: number) => {
        const sortDirection = sortType.includes('-') ? -1 : 1;

        setFilteredPizzas((prevState) => {
            const sortProperty = sortType.replace('-', '');
            return [...prevState.sort((a, b) => (Number(a[sortProperty as keyof Pizza]) - Number(b[sortProperty as keyof Pizza])) * sortDirection)];
        });
        setCurrentSort(index);
        saveToLocalStorage({ key: SORT_INDEX_KEY, data: index });
    };

    return (
        <div className='flex flex-col gap-5 relative'>
            <p className='flex items-center gap-2'>
                Сортировать по
                <span
                    ref={spanRef}
                    className='text-primary-orange font-medium cursor-pointer select-none'
                    onClick={() => setOpened((prevState) => !prevState)}
                >
                    {names[currentSort].name}
                </span>
            </p>
            {opened && (
                <SortPopupList {...{ currentSort, handleSort, names, ref: listRef }}/>
            )}
        </div>
    );
};

export default SortPopup;