import Card from "@/entities/Product/ui";
import { useAppSelector } from "@/shared/model/store";
import { appSelector } from "@/shared/model/selectors";
import ProductSkeleton from "@/entities/Product/ui/Skeletons/ProductSkeleton";

const ProductList = () => {
    const { products, loading } = useAppSelector(appSelector);

    return (
        <ul className='py-[30px] flex flex-wrap justify-between items-center gap-10'>
            {loading
                ? [...Array(6)].map((_, index) => <ProductSkeleton key={index} />)
                : products.map((item) => (
                      <li key={item.id} className='max-md:w-full'>
                          <Card {...item} />
                      </li>
                  ))}
        </ul>
    );
};

export default ProductList;