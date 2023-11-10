import React from "react";
import CategorieItem from "../../../features/CategorieItem/ui";
import { Props } from "../interfaces";
import { useDispatch } from "react-redux";

const CategoriesList: React.FC<Props> = ({ categories }) => {
    const dispatch = useDispatch();

    const handleClick = (index: number) => {
        dispatch(changeCategorieParam(index || null));
    };

    return (
        <ul className='flex items-center justify-start gap-[30px]'>
            {categories.map(({ name }, index) => (
                <CategorieItem {...{ key: name, handleClick, name, index }} />
            ))}
        </ul>
    );
};

export default CategoriesList;