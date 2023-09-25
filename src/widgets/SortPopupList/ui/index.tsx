import React from "react";
import SortPopupItem from "../../../features/SortPopupItem/ui";
import { Props } from "../interfaces";

const SortPopupList = React.forwardRef<HTMLUListElement, Props>(({ names, handleSort, currentSort }, ref) => {
    return (
        <ul ref={ref} className='absolute top-8 right-0 appearance-none p-2 rounded shadow-lg bg-white flex flex-col gap-2'>
            {names.map((item, index) => (
                <SortPopupItem key={item.name} {...{ ...item, index, handleSort, currentSort }} />
            ))}
        </ul>
    );
});

export default SortPopupList;