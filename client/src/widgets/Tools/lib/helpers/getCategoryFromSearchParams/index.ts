import { initialCategories } from "@/shared/config/constants";

const getCategoryFromSearchParams = (key: string = "category", params: URLSearchParams) => {
    const activeCategory = params.get(key);

    if (activeCategory !== null) {
        return initialCategories.get(Number(activeCategory))?.categorie ?? null;
    }

    return null;
};

export default getCategoryFromSearchParams;