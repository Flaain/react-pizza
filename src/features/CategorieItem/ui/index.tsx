import React from "react";
import cn from "../../../shared/lib/classNames";
import { Props } from "../interfaces";

const CategorieItem: React.FC<Props> = ({ name, selectedCategorie, handleClick, categorie }) => {
    return (
        <li className='flex items-center justify-center'>
            <span
                onClick={() => handleClick(categorie)}
                className={cn(
                    "px-5 py-2 rounded-full cursor-pointer font-medium transition-colors duration-200 ease-in-out",
                    selectedCategorie === (categorie ?? null)
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