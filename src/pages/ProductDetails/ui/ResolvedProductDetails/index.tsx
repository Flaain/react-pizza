import React from "react";
import DetailsHeader from "../DetailsHeader";
import Image from "@/shared/ui/Image/ui";
import CollapseInfo from "@/features/CollapseInfo/ui";
import PriceBlock from "@/widgets/PriceBlock/ui/ui";
import ImageSkeleton from "@/shared/ui/ImageSkeleton";
import BrowserTitle from "@/shared/ui/BrowserTitle";
import RelatedItems from "@/widgets/RelatedItems/ui/ui";
import { Data, Product } from "@/shared/api/interfaces";
import { useAsyncValue } from "react-router-dom";

const ResolvedProductDetails = () => {
    const { data } = useAsyncValue() as Data<Product>;

    return (
        <BrowserTitle data={data}>
            <React.Fragment key={data.id}>
                <DetailsHeader rating={data.rating} title={data.title} />
                <div className='flex items-start justify-between'>
                    <Image
                        alt={data.title}
                        src={data.imageUrl}
                        width={450}
                        height={450}
                        loading='lazy'
                        skeleton={<ImageSkeleton width={450} height={450} />}
                    />
                    <PriceBlock activeItem={data} />
                </div>
                <div className='flex flex-col gap-5 pb-5'>
                    <h2 className='text-2xl font-bold text-primary-black'>О Пицце </h2>
                    <div className='flex items-start gap-8'>
                        <CollapseInfo description={data.description} title='Описание' />
                        <CollapseInfo MAX_LENGTH={150} description={data.ingredients} title='Ингредиенты' />
                    </div>
                </div>
                <RelatedItems title='Смотрите также' activeItem={data} />
            </React.Fragment>
        </BrowserTitle>
    );
};

export default ResolvedProductDetails;