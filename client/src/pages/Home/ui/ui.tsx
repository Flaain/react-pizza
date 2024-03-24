import React from "react";
import Container from "@/shared/ui/Container";
import ProductList from "@/widgets/ProductList/ui";
import Tools from "@/widgets/Tools/ui";
import Typography from "@/shared/ui/Typography/ui/ui";
import getNotFoundTitle from "../lib/helpers/getNotFoundTitle";
import { ViewWithSuspense as NotFound } from "@/pages/NotFound";
import { useSearchParams } from "react-router-dom";
import { appSelector } from "@/shared/model/selectors";
import { useAppSelector, useAsyncThunkDispatch } from "@/shared/model/store";
import { initialCategories } from "@/shared/config/constants";
import { fetchProducts } from "@/app/redux";

const Home = () => {
    const { products, loading } = useAppSelector(appSelector);

    const [searchParams, setSearchParams] = useSearchParams();

    const activeCategory = searchParams.get("category");
    const title = activeCategory !== null ? initialCategories.get(Number(activeCategory))?.name : "Все";

    const dispatch = useAsyncThunkDispatch();

    React.useEffect(() => {
        const controller = new AbortController();

        dispatch(fetchProducts(controller));

        return () => controller.abort();
    }, [searchParams]);

    if (!loading && !products.length) return <NotFound title={getNotFoundTitle(activeCategory, searchParams.get("search") ?? "")} backLink />;

    return (
        <section className='pb-5'>
            <Container>
                <div className='flex flex-col gap-5 pb-5'>
                    <Tools searchParams={searchParams} setSearchParams={setSearchParams} />
                    <Typography as='h1' size='3xl' weight='bold'>{`${title} пиццы`}</Typography>
                </div>
                <ProductList />
            </Container>
        </section>
    );
};

export default Home;
