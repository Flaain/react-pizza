import SortPopup from "@/features/SortPopup/ui/ui";
import getCategoryFromSearchParams from "../lib/helpers/getCategoryFromSearchParams";
import { CategoriesList } from "@/widgets/CategoriesList";
import { Props } from "../model/interfaces";
import { initialSortNames } from "@/shared/config/constants";

const Tools = ({ searchParams, setSearchParams }: Props) => {
    return (
        <div className='flex items-center justify-between gap-5'>
            <CategoriesList
                setSearchParams={setSearchParams}
                activeCategory={getCategoryFromSearchParams("category", searchParams)}
            />
            <SortPopup
                activeSort={initialSortNames.get(searchParams.get("sort")!) ?? initialSortNames.get("-rating")!}
                setSearchParams={setSearchParams}
            />
        </div>
    );
};

export default Tools;