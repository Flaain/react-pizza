import React from "react";
import CategorieItem from "@/features/CategorieItem/ui";
import { Props } from "../interfaces";
import { initialCategories } from "@/shared/config/constants";

const CategoriesList: React.FC<Props> = ({ setSearchParams, activeCategory }) => {

    const handleClick = (categorie: number | null) => {
        if (activeCategory === categorie) return;
        setSearchParams((prevState) => {
            categorie === null ? prevState.delete('category') : prevState.set('category', categorie.toString());
            return prevState;
        });
    };

    return (
        <ul className='flex items-center justify-start gap-[30px]'>
            {[...initialCategories.values()].map(({ name, categorie }) => (
                <CategorieItem {...{ key: name, activeCategory, categorie,  handleClick, name }} />
            ))}
        </ul>
    );
};

export default CategoriesList;