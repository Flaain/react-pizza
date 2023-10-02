import React from "react";
import CategorieItem from "../../../features/CategorieItem/ui";
import { Props } from "../interfaces";
import { AppContext } from "../../../app/context";
import { initialCategories } from "../../../shared/initialValues";

const CategoriesList: React.FC<Props> = ({ categories }) => {
    const { searchParams, setSearchParams } = React.useContext(AppContext);

    const getCategorieParam = () => {
        if (typeof initialCategories[Number(searchParams.get("categorie"))]?.categorie === "undefined") {
            return null;
        }
        return Number(searchParams.get("categorie"));
    };

    const handleClick = (index: number) => {
        setSearchParams((prevState) => {
            typeof initialCategories[index]?.categorie !== "undefined" ? prevState.set("categorie", String(index)) : prevState.delete("categorie");
            return prevState;
        });
    };

    const selectedCategorie = getCategorieParam();

    React.useEffect(() => {
        if (searchParams.get("categorie") !== null && typeof initialCategories[Number(searchParams.get("categorie"))]?.categorie === "undefined") {
            setSearchParams((prevState) => {
                prevState.delete("categorie");
                return prevState;
            });
        }
    }, [selectedCategorie]);

    return (
        <ul className='flex items-center justify-start gap-[30px]'>
            {categories.map(({ name }, index) => (
                <CategorieItem {...{ key: name, handleClick, name, selectedCategorie, index }} />
            ))}
        </ul>
    );
};

export default CategoriesList;