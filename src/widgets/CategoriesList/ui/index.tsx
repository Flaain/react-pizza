import React from "react";
import CategorieItem from "../../../features/CategorieItem/ui";
import { Props } from "../interfaces";
import { AppContext, HomeContext } from "../../../app/context";
import { initialCategories } from "../../../shared/initialValues";

const CategoriesList: React.FC<Props> = ({ categories }) => {
    const { setSearchParams } = React.useContext(AppContext);
    const { selectedCategorieIndex } = React.useContext(HomeContext);

    const handleClick = (index: number) => {
        setSearchParams((prevState) => {
            typeof initialCategories[index]?.categorie !== "undefined" ? prevState.set("categorie", String(index)) : prevState.delete("categorie");
            return prevState;
        });
    };

    return (
        <ul className='flex items-center justify-start gap-[30px]'>
            {categories.map(({ name }, index) => (
                <CategorieItem {...{ key: name, handleClick, name, selectedCategorieIndex, index }} />
            ))}
        </ul>
    );
};

export default CategoriesList;