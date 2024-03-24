import React from "react";
import Card from "@/entities/Product/ui/ui";
import ProductSkeleton from "@/entities/Product/ui/Skeletons/ProductSkeleton";
import useInfiniteScroll from "@/pages/Home/lib/useInfiniteScroll";
import { useAppSelector, useAsyncThunkDispatch } from "@/shared/model/store";
import { appSelector, cartSelector, userSelector } from "@/shared/model/selectors";
import { getProductPerPage } from "@/pages/Home/model/asyncActions";

const ProductList = () => {
    const { products, loading } = useAppSelector(appSelector);
    const { cartLoading } = useAppSelector(cartSelector);
    const { isAuthInProgress } = useAppSelector(userSelector);

    const [perPageLoading, setPerPageLoading] = React.useState(false);

    const dispatch = useAsyncThunkDispatch();

    const handleScroll = async (params: { page: number; params: URLSearchParams }) => {
        try {
            setPerPageLoading(true);
            await dispatch(getProductPerPage(params));
        } catch (error) {
            console.error(error);
        } finally {
            setPerPageLoading(false);
        }
    };

    const ref = useInfiniteScroll<HTMLLIElement>({
        callback: handleScroll,
        threshold: 1,
        deps: [!loading, !perPageLoading],
    });

    return (
        <ul className='flex flex-wrap justify-between items-center gap-10'>
            {loading || cartLoading || isAuthInProgress
                ? [...Array(6)].map((_, index) => <ProductSkeleton key={index} />)
                : products.map((item, index, products) => (
                      <li key={item.id} className='max-md:w-full' ref={index === products.length - 1 ? ref : null}>
                          <Card {...item} />
                      </li>
                  ))}
            {perPageLoading && [...Array(3)].map((_, index) => <ProductSkeleton key={index} />)}
        </ul>
    );
};

export default ProductList;
