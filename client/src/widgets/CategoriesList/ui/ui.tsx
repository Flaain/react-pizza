import { CategorieListProps } from "../model/interfaces";
import CategorieItem from "./CategorieItem";
import { initialCategories } from "@/shared/config/constants";

const CategoriesList = ({ setSearchParams, activeCategory }: CategorieListProps) => {
    const handleClick = (categorie: number | null) => {
        setSearchParams((prevState) => {
            categorie === null ? prevState.delete("category") : prevState.set("category", categorie.toString());
            return prevState;
        });
    };

    return (
        <ul className='flex items-center justify-start gap-[30px] ove'>
            {[...initialCategories.values()].map(({ name, categorie }) => (
                <CategorieItem {...{ key: name, activeCategory, categorie, handleClick, name }} />
            ))}
        </ul>
    );
};

export default CategoriesList;