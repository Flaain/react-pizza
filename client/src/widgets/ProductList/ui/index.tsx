import Card from "@/entities/Product/ui/ui";
import ProductSkeleton from "@/entities/Product/ui/Skeletons/ProductSkeleton";
import useInfiniteScroll from "@/pages/Home/lib/useInfiniteScroll";
import { useAppSelector, useAsyncThunkDispatch } from "@/shared/model/store";
import { appSelector, cartSelector, userSelector } from "@/shared/model/selectors";
import { getProductPerPage } from "@/pages/Home/model/asyncActions";

const ProductList = () => {
    const { products, loading, perPageLoading } = useAppSelector(appSelector);
    const { cartLoading } = useAppSelector(cartSelector);
    const { isAuthInProgress } = useAppSelector(userSelector);

    const dispatch = useAsyncThunkDispatch();

    const ref = useInfiniteScroll<HTMLLIElement>({
        callback: (page, params) => dispatch(getProductPerPage({ page, params })),
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
        </ul>
    );
};

export default ProductList;