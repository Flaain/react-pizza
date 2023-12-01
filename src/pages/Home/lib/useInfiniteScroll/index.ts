import React from "react";
import { getProductPerPage } from "../../model/asyncActions";
import { useAppSelector, useAsyncThunkDispatch } from "@/shared/model/store";
import { appSelector } from "@/shared/model/selectors";

const useInfiniteScroll = (initialPage = 1) => {
    const { products, _meta, perPageLoading } = useAppSelector(appSelector);

    const [page, setPage] = React.useState(_meta?.current_page ?? initialPage);

    const dispatch = useAsyncThunkDispatch();

    const handleScroll = React.useCallback(() => {
        const scrollPosition = document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight);
        const metaConditions = _meta && _meta.total_items > products.length && _meta.total_pages > page;

        scrollPosition < 100 && metaConditions && setPage((prevState) => prevState + 1);
    }, [page, products, _meta]);

    React.useEffect(() => {
        !perPageLoading && page > 1 && dispatch(getProductPerPage({ page, params: new URLSearchParams(document.location.search) }));
    }, [page]);

    React.useEffect(() => {
        _meta && setPage(_meta.current_page);
        return () => {
            setPage(1);
        }
    }, [_meta]); /* <-- i think this is a bad code but i don't know to to rewrite better. 
    Main problem is when i scroll to the end and change category the page is not changes.
    So for example: I scroll to the end of "Все" category and my state page quals 3. 
    Now i change category to "Мясные" or something and my page is still 3.*/

    return handleScroll;
};

export default useInfiniteScroll;