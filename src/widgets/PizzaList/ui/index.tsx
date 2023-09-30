import React from "react";
import Card from "../../../entities/Card/ui";
import Title from "../../../shared/ui/Title/ui";
import getSortedArr from "../../../shared/lib/helpers/getSortedArr";
import { Props } from "../interfaces";
import { AppContext } from "../../../app/context";
import { initialSortNames } from "../../../shared/initialValues";

const PizzaList: React.FC<Props> = ({ data, view }) => {
    const { searchValue, searchParams } = React.useContext(AppContext);

    const isEmpty = !data.filter(({ title }) => title.toLowerCase().includes(searchValue.toLowerCase())).length;
    const currentSort = searchParams.get("sort") !== null ? Number(searchParams.get("sort")) : 0;
    const selectedCategorie = searchParams.get("categorie") !== null ? Number(searchParams.get("categorie")) : null;
    const sortDirection = initialSortNames[currentSort].sort.includes("-") ? -1 : 1;
    const property = initialSortNames[currentSort].sort.replace("-", "");

    return (
        <ul className='py-[30px] flex flex-wrap justify-between items-center gap-10'>
            {isEmpty ? (
                <Title title={`${searchValue} not found`} />
            ) : (
                data
                    .filter(
                        ({ title, category }) =>
                            title.toLowerCase().includes(searchValue.toLowerCase()) &&
                            (selectedCategorie === null || category === selectedCategorie)
                    )
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