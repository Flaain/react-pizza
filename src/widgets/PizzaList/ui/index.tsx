import React from "react";
import Card from "../../../entities/Card/ui";
import Title from "../../../shared/ui/Title/ui";
import getSortedArr from "../../../shared/lib/helpers/getSortedArr";
import getSortInfo from "../../../shared/lib/helpers/getSortInfo";
import { Props } from "../interfaces";
import { initialCategories, initialSortNames } from "../../../shared/initialValues";
import { Pizza } from "../../../shared/api/interfaces";
import { HomeContext } from "../../../app/context";

const PizzaList: React.FC<Props> = ({ data, searchValue }) => {
    const { view, selectedSortIndex, selectedCategorieIndex } = React.useContext(HomeContext);
    const { sortDirection, property } = getSortInfo(initialSortNames, selectedSortIndex);

    const handleFilter = ({ title, category }: Pizza) => {
        return (
            title.toLowerCase().includes(searchValue.toLowerCase()) &&
            (selectedCategorieIndex === null || category === initialCategories[selectedCategorieIndex]?.categorie)
        );
    };

    return (
        <ul className='py-[30px] flex flex-wrap justify-between items-center gap-10'>
            {!data.filter(handleFilter).length ? (
                <Title title={`${searchValue} not found`} />
            ) : (
                data
                    .filter(handleFilter)
                    .sort((a, b) => getSortedArr(a, b, sortDirection, property))
                    .slice(0, view)
                    .map((item) => (
                        <li key={item.id}>
                            <Card {...item} />
                        </li>
                    ))
            )}
        </ul>
    );
};

export default PizzaList;