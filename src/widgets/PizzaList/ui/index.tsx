import React from "react";
import Card from "../../../entities/Card/ui";
import Title from "../../../shared/ui/Title/ui";
import getSortedArr from "../../../shared/lib/helpers/getSortedArr";
import filterBySearchAndCategory from "../../../shared/lib/helpers/filterBySearchAndCategorie";
import { Props } from "../interfaces";
import { useSelector } from "react-redux";
import { rootSelector } from "@/app/redux";
import { INITIAL_VIEW } from "@/shared/config/constants";

const PizzaList: React.FC<Props> = ({ categorie, property, searchQuery, sortDirection }) => {
    const [view, setView] = React.useState(INITIAL_VIEW);

    const { pizzas } = useSelector(rootSelector);

    const handleScroll = () => {
        if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 100 && view < pizzas.length) {
            setView((prevState) => prevState + 3);
        }
    };

    React.useEffect(() => {
        document.addEventListener("scroll", handleScroll);

        return () => document.removeEventListener("scroll", handleScroll);
    }, [view, pizzas]);

    return (
        <h1>LIST</h1>
        // <ul className='py-[30px] flex flex-wrap justify-between items-center gap-10'>
        //     {!pizzas.filter((pizza) => filterBySearchAndCategory(pizza, categorie, searchQuery)).length ? (
        //         <Title title={`по вашему запросу: ${searchQuery} ничего не найдено`} />
        //     ) : (
        //         pizzas
        //             .filter((pizza) => filterBySearchAndCategory(pizza, categorie, searchQuery))
        //             .sort((a, b) => getSortedArr(a, b, sortDirection, property))
        //             .slice(0, view)
        //             .map((item) => (
        //                 <li key={item.id} className='max-md:w-full'>
        //                     <Card {...item} />
        //                 </li>
        //             ))
        //     )}
        // </ul>
    );
};

export default PizzaList;