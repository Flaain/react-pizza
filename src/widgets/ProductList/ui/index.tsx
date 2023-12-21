import Card from "@/entities/Product/ui";
import ProductSkeleton from "@/entities/Product/ui/Skeletons/ProductSkeleton";
import useInfiniteScroll from "@/pages/Home/lib/useInfiniteScroll";
import { useAppSelector, useAsyncThunkDispatch } from "@/shared/model/store";
import { appSelector } from "@/shared/model/selectors";
import { getProductPerPage } from "@/pages/Home/model/asyncActions";

const ProductList = () => {
    const { products, loading, perPageLoading } = useAppSelector(appSelector);
    
    const dispatch = useAsyncThunkDispatch();
    
    const ref = useInfiniteScroll<HTMLLIElement>({
        callback: (page, params) => dispatch(getProductPerPage({ page, params })),
        threshold: 1,
        deps: [!loading, !perPageLoading],
    });

    return (
        <ul className='py-[30px] flex flex-wrap justify-between items-center gap-10'>
            {loading
                ? [...Array(6)].map((_, index) => <ProductSkeleton key={index} />)
                : products.map((item, i, products) => (
                      <li key={item.id} className='max-md:w-full' ref={i === products.length - 1 ? ref : null}>
                          <Card {...item} />
                      </li>
                  ))}
        </ul>
    );
};

export default ProductList;