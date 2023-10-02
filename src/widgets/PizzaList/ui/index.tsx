import React from "react";
import Card from "../../../entities/Card/ui";
import Title from "../../../shared/ui/Title/ui";
import getSortedArr from "../../../shared/lib/helpers/getSortedArr";
import { Props } from "../interfaces";
import { initialCategories, initialSortNames } from "../../../shared/initialValues";
import { Pizza } from "../../../shared/api/interfaces";

const PizzaList: React.FC<Props> = ({ data, view, searchValue, searchParams }) => {
    const getCategorieParam = () => {
        if (typeof initialCategories[Number(searchParams.get("categorie"))]?.categorie === "undefined") {
            return null;
        }
        return Number(searchParams.get("categorie"));
    };

    const getSortParam = () => {
        if (typeof initialSortNames[Number(searchParams.get("sort"))]?.sort === "undefined") {
            return 0;
        }
        return Number(searchParams.get("sort"));
    };

    const currentSort = getSortParam();
    const selectedCategorieIndex = getCategorieParam();

    const sortDirection = initialSortNames[currentSort]?.sort.includes("-") ? -1 : 1;
    const property = initialSortNames[currentSort]?.sort.replace("-", "");

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
                    .map((item) => (
                        <li key={item.id}>
                            <Card {...item} />
                        </li>
                    ))
                    .slice(0, view)
            )}
        </ul>
    );
};

export default PizzaList;