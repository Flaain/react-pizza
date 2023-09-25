import React from "react";
import Card from "../../../entities/Card/ui";
import { Props } from "../interfaces";

const PizzaList: React.FC<Props> = ({ data }) => {
    return (
        <ul className='py-[30px] flex flex-wrap justify-between items-center gap-10'>
            {data.map((item) => (
                <li key={item.id}>
                    <Card {...item} />
                </li>
            ))}
        </ul>
    );
};

export default PizzaList;