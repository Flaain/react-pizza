import cn from "@/shared/lib/classNames";
import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import SortPopupList from "./SortPopupList";
import { AnimatePresence } from "framer-motion";
import { SortPopupProps } from "../model/interfaces";
import { useSortPopup } from "../lib/useSortPopup";

const SortPopup = ({ activeSort, setSearchParams }: SortPopupProps) => {
    const { opened, setOpened, listRef, spanRef } = useSortPopup();

    const handleSort = (sort: string) => {
        setSearchParams((prevState) => {
            prevState.set("sort", sort);
            return prevState;
        });
    };

    return (
        <div className='flex items-center gap-2 relative'>
            <div className='flex items-center gap-2 max-xl:hidden'>
                <img
                    src={getImageUrl("chevron_up.svg")}
                    alt='chevron'
                    className={cn(opened ? "rotate-0" : "-rotate-180", "transition-transform ease-in-out duration-200")}
                />
                <p className='flex items-center gap-2 whitespace-nowrap'>Сортировать по</p>
            </div>
            <span
                ref={spanRef}
                className='flex py-2 px-3 hover:bg-orange-100 transition-colors duration-200 ease-in-out rounded-lg bg-orange-50 items-center gap-2 whitespace-nowrap text-primary-orange font-medium cursor-pointer select-none'
                onClick={() => setOpened((prevState) => !prevState)}
            >
                <img
                    src={getImageUrl("sort_inactive.svg")}
                    alt='sort'
                    className={cn("pointer-events-none", !activeSort?.sort.includes("-") && "rotate-180")}
                />
                {activeSort?.name}
            </span>
            <AnimatePresence>
                {opened && <SortPopupList {...{ activeSort, handleSort, ref: listRef }} />}
            </AnimatePresence>
        </div>
    );
};

export default SortPopup;