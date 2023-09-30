import React from "react";
import CategoriesList from "../../../widgets/CategoriesList/ui";
import SortPopup from "../../../features/SortPopup/ui";
import { Props } from "../interfaces";

const Tools: React.FC<Props> = ({ categories, sortNames }) => {
    return (
        <div className='flex items-center justify-between'>
            <CategoriesList categories={categories}  />
            <SortPopup names={sortNames} />
        </div>
    );
};

export default Tools;