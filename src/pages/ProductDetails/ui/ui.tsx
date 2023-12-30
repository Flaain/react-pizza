import React from "react";
import Container from "@/shared/ui/Container";
import cn from "@/shared/lib/classNames";
import Spinner from "@/shared/ui/Spinner/ui";
import ResolvedProductDetails from "./ResolvedProductDetails";
import { Await, useLoaderData } from "react-router-dom";
import { Product } from "@/shared/api/interfaces";

const ProductDetails = () => {
    const { product } = useLoaderData() as { product: Product };

    return (
        <section className="mt-5">
            <Container
                classNames={cn("max-w-[1320px] w-full my-0 mx-auto px-[15px] box-border flex flex-col gap-5 relative")}
            >
                <React.Suspense fallback={<Spinner position='center' />}>
                    <Await resolve={product}>
                        <ResolvedProductDetails />
                    </Await>
                </React.Suspense>
            </Container>
        </section>
    );
};

export default ProductDetails;