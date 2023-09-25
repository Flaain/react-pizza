import React from "react";
import CategoriesList from "../../../widgets/CategoriesList/ui";
import SortPopup from "../../../features/SortPopup/ui";
import { Props } from "../interfaces";
import { AppContext } from "../../../app/context";

const Tools: React.FC<Props> = ({ categories, sortNames }) => {
    const { currentSort, setCurrentSort } = React.useContext(AppContext);

    return (
        <div className='flex items-center justify-between'>
            <CategoriesList categories={categories} currentSort={currentSort} />
            <SortPopup names={sortNames} currentSort={currentSort} setCurrentSort={setCurrentSort} />
        </div>
    );
};

export default Tools;