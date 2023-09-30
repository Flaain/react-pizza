import React from "react";
import CategorieItem from "../../../features/CategorieItem/ui";
import { Props } from "../interfaces";
import { AppContext } from "../../../app/context";

const CategoriesList: React.FC<Props> = ({ categories }) => {
    const { searchParams, setSearchParams } = React.useContext(AppContext);

    const selectedCategorie = searchParams.get("categorie") !== null ? Number(searchParams.get("categorie")) : null;

    const handleClick = (category: number | undefined) => {
        setSearchParams((prevState) => {
            typeof category === "number" ? prevState.set("categorie", String(category)) : prevState.delete("categorie");
            return prevState;
        });
    };

    return (
        <ul className='flex items-center justify-start gap-[30px]'>
            {categories.map(({ name, categorie }) => (
                <CategorieItem {...{ key: name, handleClick, name, selectedCategorie, categorie }} />
            ))}
        </ul>
    );
};

export default CategoriesList;