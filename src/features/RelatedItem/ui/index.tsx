import React from "react";
import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import getIntlPrice from "@/shared/lib/helpers/getIntlPrice";
import Image from "@/shared/ui/Image/ui";
import ImageSkeleton from "@/shared/ui/ImageSkeleton";
import { Product } from "@/shared/api/interfaces";
import { Link } from "react-router-dom";

const RelatedItem: React.FC<
    Omit<Product, "category" | "ingredients" | "sizes" | "types" | "description"> & { itemWidth: number }
> = ({ id, imageUrl, price, rating, title, itemWidth }) => {
    return (
        <Link to={`/pizza/${id}`}>
            <article>
                <Image
                    loading='lazy'
                    alt={title}
                    src={imageUrl}
                    width={itemWidth}
                    height={200}
                    skeleton={<ImageSkeleton width={itemWidth} height={200} />}
                />
                <div className='flex flex-col gap-1'>
                    <h4 className='font-bold text-xl text-primary-black'>{getIntlPrice(price)}</h4>
                    <h5 className='font-medium text-primary-black'>{title}</h5>
                    <div className='flex items-center gap-3'>
                        <span className='flex items-center gap-2 font-semibold'>
                            <img src={getImageUrl("rating.svg")} alt='start rating' width={14} height={14} />
                            {rating}
                        </span>
                        <span className='text-gray-400'>391 оценка</span>
                    </div>
                </div>
            </article>
        </Link>
    );
};

export default RelatedItem;