import React from "react";
import CategorieItem from "../../../features/CategorieItem/ui";
import getSortedArr from "../../../shared/lib/helpers/getSortedArr";
import { Props } from "../interfaces";
import { AppContext } from "../../../app/context";
import { initialSortNames } from "../../../shared/initialValues";

const CategoriesList: React.FC<Props> = ({ categories }) => {
    const { pizzas, setFilteredPizzas, searchParams, setSearchParams } = React.useContext(AppContext);
    const selectedCategorie = searchParams.get('categorie') !== null ? Number(searchParams.get('categorie')) : null;

    const handleClick = (category: number | undefined) => {
        setSearchParams((prevState) => {
            typeof category === "number" ? prevState.set('categorie', String(category)) : prevState.delete('categorie');
            return prevState;  
        })
        handleSortPizzas(category);
    };
    
    const getFilteredPizzasByCategory = (category: number | undefined) => {
        return typeof category !== 'undefined' ? pizzas.filter(({ category: pizzaCategory }) => pizzaCategory === category) : pizzas;
    };
    
    const handleSortPizzas = (category: number | undefined) => {
        const filteredPizzas = getFilteredPizzasByCategory(category);
        const currentSort = searchParams.get('sort') !== null ? Number(searchParams.get('sort')) : 0; 
        const sortDirection = initialSortNames[currentSort].sort.includes("-") ? -1 : 1;
        const property = initialSortNames[currentSort].sort.replace('-', '');
    
        setFilteredPizzas([...filteredPizzas].sort((a, b) => getSortedArr(a, b, sortDirection, property)));
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