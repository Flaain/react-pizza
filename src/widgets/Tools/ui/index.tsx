import CategoriesList from "@/widgets/CategoriesList/ui";
import SortPopup from "@/features/SortPopup/ui/ui";
import getCategoryFromSearchParams from "@/pages/Home/lib/helpers/getCategoryFromSearchParams";
import { Props } from "../interfaces";
import { initialSortNames } from "@/shared/config/constants";

const Tools = ({ searchParams, setSearchParams }: Props) => {
    const activeSort = initialSortNames.get(searchParams.get("sort")!) ?? initialSortNames.get("-rating");

    return (
        <div className='flex items-center justify-between'>
            <CategoriesList
                setSearchParams={setSearchParams}
                activeCategory={getCategoryFromSearchParams("category", searchParams)}
            />
            <SortPopup activeSort={activeSort!} setSearchParams={setSearchParams} />
        </div>
    );
};

export default Tools;