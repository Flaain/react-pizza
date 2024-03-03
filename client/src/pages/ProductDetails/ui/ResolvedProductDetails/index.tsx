import React from "react";
import DetailsHeader from "../DetailsHeader";
import Image from "@/shared/ui/Image/ui/ui";
import CollapseInfo from "@/features/CollapseInfo/ui/ui";
import PriceBlock from "@/widgets/PriceBlock/ui/ui";
import ImageSkeleton from "@/shared/ui/Image/ui/Skeleton";
import BrowserTitle from "@/shared/ui/BrowserTitle";
import RelatedItems from "@/widgets/RelatedItems/ui/ui";
import { useAsyncValue } from "react-router-dom";
import { Product } from "@/shared/model/interfaces";
import { useAppSelector } from "@/shared/model/store";
import { cartSelector, userSelector } from "@/shared/model/selectors";
import { OptionsSelectorSkeleton } from "@/shared/ui/OptionsSelector";

const ResolvedProductDetails = () => {
    const product = useAsyncValue() as Product;

    const { cartLoading } = useAppSelector(cartSelector);
    const { isAuthInProgress } = useAppSelector(userSelector);

    return (
        <BrowserTitle data={product}>
            <React.Fragment key={product.id}>
                <DetailsHeader rating={product.rating} title={product.title} />
                <div className='flex items-start justify-between'>
                    <Image
                        alt={product.title}
                        src={product.imageUrl}
                        width={450}
                        height={450}
                        loading='lazy'
                        skeleton={<ImageSkeleton width={450} height={450} />}
                    />
                    {(cartLoading || isAuthInProgress) ? <OptionsSelectorSkeleton /> : <PriceBlock activeItem={product} />}
                </div>
                <div className='flex flex-col gap-5 pb-5'>
                    <h2 className='text-2xl font-bold text-primary-black'>О Пицце </h2>
                    <div className='flex items-start gap-8'>
                        <CollapseInfo description={product.description} title='Описание' />
                        <CollapseInfo MAX_LENGTH={150} description={product.ingredients} title='Ингредиенты' />
                    </div>
                </div>
                <RelatedItems title='Смотрите также' activeItem={product} />
            </React.Fragment>
        </BrowserTitle>
    );
};

export default ResolvedProductDetails;