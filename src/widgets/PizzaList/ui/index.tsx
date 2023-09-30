import React from "react";
import Card from "../../../entities/Card/ui";
import Title from "../../../shared/ui/Title/ui";
import getSortedArr from "../../../shared/lib/helpers/getSortedArr";
import { Props } from "../interfaces";
import { initialSortNames } from "../../../shared/initialValues";
import { Pizza } from "../../../shared/api/interfaces";

const PizzaList: React.FC<Props> = ({ data, view, searchValue, searchParams }) => {
    const currentSort = searchParams.get("sort") !== null ? Number(searchParams.get("sort")) : 0;
    const selectedCategorie = searchParams.get("categorie") !== null ? Number(searchParams.get("categorie")) : null;
    const sortDirection = initialSortNames[currentSort]?.sort.includes("-") ? -1 : 1;
    const property = initialSortNames[currentSort]?.sort.replace("-", "");

    const handleFilter = ({ title, category }: Pizza) => {
        return title.toLowerCase().includes(searchValue.toLowerCase()) && (selectedCategorie === null || category === selectedCategorie);
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