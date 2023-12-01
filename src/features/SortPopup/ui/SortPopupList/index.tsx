import React from "react";
import SortPopupItem from "@/features/SortPopup/ui/SortItem";
import { motion } from "framer-motion";
import { SortPopupListProps } from "@/features/SortPopup/model/interfaces";
import { initialSortNames } from "@/shared/config/constants";

const SortPopupList = React.forwardRef<HTMLUListElement, SortPopupListProps>(({ handleSort, activeSort }, ref) => {
    return (
        <motion.ul
            initial={{ top: 60, opacity: 0 }}
            animate={{ top: 50, opacity: 1 }}
            exit={{ top: 60, opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.15 }}
            ref={ref}
            className='absolute right-0 appearance-none p-2 rounded shadow-lg bg-white flex flex-col gap-2 z-50'
        >
            {[...initialSortNames.values()].map((item) => (
                <SortPopupItem key={item.id} {...item} activeSort={activeSort} handleSort={handleSort} />
            ))}
        </motion.ul>
    );
});

export default SortPopupList;