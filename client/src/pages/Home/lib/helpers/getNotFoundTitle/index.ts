import { initialCategories } from "@/shared/config/constants";

const getNotFoundTitle = (category: string | null, query: string | null) => {
    if (category !== null && initialCategories.has(Number(category)) && query?.trim().length) {
        return `В категории «${initialCategories.get(Number(category))?.name}» по запросу «${query}» ничего не найдено`;
    }
    return query?.trim().length ? `По запросу «${query}» ничего не найдено` : "По вашему запросу ничего не найдено";
};

export default getNotFoundTitle;