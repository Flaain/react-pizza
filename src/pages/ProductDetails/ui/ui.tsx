import React from "react";
import Container from "@/shared/ui/Container";
import cn from "@/shared/lib/classNames";
import RelatedItems from "@/widgets/RelatedItems/ui";
import Spinner from "@/shared/ui/Spinner/ui";
import ResolvedProductDetails from "./ResolvedProductDetails";
import { Await, useLoaderData } from "react-router-dom";
import { useAppSelector } from "@/shared/model/store";
import { appSelector } from "@/shared/model/selectors";
import { Product } from "@/shared/api/interfaces";

const ProductDetails = () => {
    const { products } = useAppSelector(appSelector);
    const { product } = useLoaderData() as { product: Product };

    const relatedItems = React.useMemo(() => products.filter(({ id }) => id !== product?.id), [products, product]);

    return (
        <section>
            <Container
                classNames={cn("max-w-[1320px] w-full my-0 mx-auto px-[15px] box-border flex flex-col gap-5 relative")}
            >
                <React.Suspense fallback={<Spinner position='center' />}>
                    <Await resolve={product}>
                        <ResolvedProductDetails />
                    </Await>
                </React.Suspense>
                <RelatedItems title='Смотрите также' items={relatedItems} />
            </Container>
        </section>
    );
};

export default ProductDetails;