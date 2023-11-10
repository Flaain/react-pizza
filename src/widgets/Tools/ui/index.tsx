import React from "react";
import CategoriesList from "../../../widgets/CategoriesList/ui";
import SortPopup from "../../../features/SortPopup/ui";
import { Props } from "../interfaces";
import useViewport from "../../../shared/hooks/useViewport";
import SidebarCategories from "../../../features/SidebarCategories/ui";

const Tools: React.FC<Props> = ({ categories, sortNames }) => {
    const { width, breakepoints: { lg } } = useViewport();

    return (
        <div className='flex items-center justify-between'>
            {width <= lg ? <SidebarCategories /> : <CategoriesList categories={categories} />}
            {/* <SortPopup names={sortNames} /> */}
        </div>
    );
};

export default Tools;