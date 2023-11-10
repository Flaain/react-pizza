import React from "react";
import SortPopupItem from "../../../features/SortPopupItem/ui";
import { motion } from "framer-motion";
import { Props } from "../interfaces";

const SortPopupList = React.forwardRef<HTMLUListElement, Props>(({ names, handleSort, sortIndex }, ref) => {
    return (
        <motion.ul
            initial={{ top: 60, opacity: 0 }}
            animate={{ top: 50, opacity: 1 }}
            exit={{ top: 60, opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.15 }}
            ref={ref}
            className='absolute right-0 appearance-none p-2 rounded shadow-lg bg-white flex flex-col gap-2'
        >
            {names.map((item, index) => (
                <SortPopupItem key={item.id} {...{ ...item, index, handleSort, sortIndex }} />
            ))}
        </motion.ul>
    );
});

export default SortPopupList;