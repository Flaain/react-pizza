import React from "react";
import cn from "@/shared/lib/classNames";
import { Props } from "../interfaces";
import { initialCategories } from "@/shared/config/constants";

const CategorieItem: React.FC<Props> = ({ name, handleClick, index }) => {
    return (
        <li className='flex items-center justify-center'>
            <span
                onClick={() => handleClick(index)}
                className={cn(
                    "px-5 max-md:w-full max-md:flex max-md:items-center max-md:justify-center py-2 rounded-full cursor-pointer font-medium transition-colors duration-200 ease-in-out",
                    1 === (typeof initialCategories[index]?.categorie !== "undefined" ? index : null)
                        ? "bg-primary-black text-white"
                        : "bg-transparent text-primary-black hover:bg-primary-black hover:text-white"
                )}
            >
                {name}
            </span>
        </li>
    );
};

export default CategorieItem;