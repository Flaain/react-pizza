import React from "react";
import Card from "../../../entities/Card/ui";
import Title from "../../../shared/ui/Title/ui";
import { Props } from "../interfaces";
import { AppContext } from "../../../app/context";

const PizzaList: React.FC<Props> = ({ data, view }) => {
    const { searchValue } = React.useContext(AppContext);

    const isEmpty = !data.filter(({ title }) => title.toLowerCase().includes(searchValue.toLowerCase())).length;

    console.log(searchValue)
    return (
        <ul className='py-[30px] flex flex-wrap justify-between items-center gap-10'>
            {isEmpty ? (
                <Title title={`${searchValue} not found`} />
            ) : (
                data
                    .filter(({ title }) => title.toLowerCase().includes(searchValue.toLowerCase()))
                    .map((item) =>
                         (
                            <li key={item.id}>
                                <Card {...item} />
                            </li>
                        )
                    ).slice(0, view)
            )}
        </ul>
    );
};

export default PizzaList;