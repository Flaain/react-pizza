import DetailsHeader from "../DetailsHeader";
import Image from "@/shared/ui/Image/ui";
import PriceBlock from "@/widgets/PriceBlock/ui";
import CollapseInfo from "@/features/CollapseInfo/ui";
import { Product } from "@/shared/api/interfaces";
import { useAsyncValue } from "react-router-dom";

const ResolvedProductDetails = () => {
    const { rating, title, description, ingredients, imageUrl, ...activeItem } = useAsyncValue() as Product;

    return (
        <>
            <DetailsHeader rating={rating} title={title} />
            <div className='flex items-start justify-between'>
                <Image alt={title} src={imageUrl} />
                <PriceBlock {...{ activeItem, searchParams, setSearchParams }} />
            </div>
            <div className='flex flex-col gap-5 pb-5'>
                <h2 className='text-2xl font-bold text-primary-black'>О Пицце </h2>
                <div className='flex items-start gap-8'>
                    <CollapseInfo description={description} title='Описание' />
                    <CollapseInfo MAX_LENGTH={150} description={ingredients} title='Ингредиенты' />
                </div>
            </div>
        </>
    );
};

export default ResolvedProductDetails;