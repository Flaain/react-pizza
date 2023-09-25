import React from "react";
import saveToLocalStorage from "../../../shared/lib/helpers/saveToLocalStorage";
import CategorieItem from "../../../features/CategorieItem/ui";
import { Props } from "../interfaces";
import { CATEGORIE_KEY, initialSortNames } from "../../../shared/initialValues";
import { AppContext } from "../../../app/context";
import { Pizza } from "../../../shared/api/interfaces";

const CategoriesList: React.FC<Props> = ({ categories, currentSort }) => {
    const { selectedCategorie, setSelectedCategorie, pizzas, setFilteredPizzas } = React.useContext(AppContext);

    const handleClick = (category: number | undefined) => {
        setSelectedCategorie(category ?? null);
        handleSortPizzas(category);
    
        typeof category !== "undefined" ? saveToLocalStorage({ key: CATEGORIE_KEY, data: category }) : localStorage.removeItem(CATEGORIE_KEY);
    };
    
    const getFilteredPizzasByCategory = (category: number | undefined) => {
        return typeof category !== 'undefined' ? pizzas.filter(({ category: pizzaCategory }) => pizzaCategory === category) : pizzas;
    };
    
    const handleSortPizzas = (category: number | undefined) => {
        const filteredPizzas = getFilteredPizzasByCategory(category); 
        const sortDirection = initialSortNames[currentSort].sort.includes("-") ? -1 : 1;
    
        const sortedPizzas = [...filteredPizzas].sort((a, b) => {
            const sortProperty = initialSortNames[currentSort].sort.replace('-', '');
            return (Number(a[sortProperty as keyof Pizza]) - Number(b[sortProperty as keyof Pizza])) * sortDirection;
        });
    
        setFilteredPizzas(sortedPizzas);
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