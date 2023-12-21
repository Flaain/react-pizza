import React from "react";
import Container from "@/shared/ui/Container";
import ProductList from "@/widgets/ProductList/ui";
import Tools from "@/widgets/Tools/ui";
import Title from "@/shared/ui/Title/ui";
import Spinner from "@/shared/ui/Spinner/ui";
import getNotFoundTitle from "../lib/helpers/getNotFoundTitle";
import { Page as NotFound } from "@/pages/NotFound";
import { useSearchParams } from "react-router-dom";
import { appSelector } from "@/shared/model/selectors";
import { useAppSelector, useAsyncThunkDispatch } from "@/shared/model/store";
import { initialCategories } from "@/shared/config/constants";
import { fetchProducts } from "@/app/redux";

const Home = () => {
    const { products, loading, perPageLoading } = useAppSelector(appSelector);

    const [searchParams, setSearchParams] = useSearchParams();

    const activeCategory = searchParams.get("category");

    const title = activeCategory !== null ? initialCategories.get(Number(activeCategory))?.name : "Все";

    const dispatch = useAsyncThunkDispatch();

    React.useEffect(() => {
        const controller = new AbortController();

        dispatch(fetchProducts(controller));

        return () => controller.abort();
    }, [searchParams])
    
    if (!loading && !products.length) return <NotFound title={getNotFoundTitle(activeCategory, searchParams.get("search") ?? "")} backLink />;

    return (
        <section>
            <Container>
                <div className='flex flex-col gap-5'>
                    <Tools searchParams={searchParams} setSearchParams={setSearchParams} />
                    <Title title={`${title} пиццы`} />
                </div>
                <>
                    <ProductList />
                    {perPageLoading && <Spinner position='bottom' />}
                </>
            </Container>
        </section>
    );
};

export default Home;