import { Pizza } from "@/shared/api/interfaces";
import { initialCategories } from "@/shared/config/constants";

const filterBySearchAndCategory = ({ title, category }: Pizza, categorieFilterIndex: number | null, searchValue: string) => {
    return (
        title.toLowerCase().includes(searchValue.toLowerCase()) && 
        (categorieFilterIndex === null || category === initialCategories[categorieFilterIndex]?.categorie)
    );
};

export default filterBySearchAndCategory;