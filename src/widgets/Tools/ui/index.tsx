import React from "react";
import CategoriesList from "@/widgets/CategoriesList/ui";
import SortPopup from "@/features/SortPopup/ui/ui";
import getCategoryFromSearchParams from "@/pages/Home/lib/helpers/getCategoryFromSearchParams";
import { Props } from "../interfaces";

const Tools: React.FC<Props> = ({ searchParams, setSearchParams }) => {
    return (
        <div className='flex items-center justify-between'>
            <CategoriesList
                setSearchParams={setSearchParams}
                activeCategory={getCategoryFromSearchParams("category", searchParams)}
            />
            <SortPopup activeSort={searchParams.get("sort") ?? "-rating"} setSearchParams={setSearchParams}/>
        </div>
    );
};

export default Tools;