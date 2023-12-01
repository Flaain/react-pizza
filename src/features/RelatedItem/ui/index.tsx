import React from "react";
import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import getIntlPrice from "@/shared/lib/helpers/getIntlPrice";
import { Product } from "@/shared/api/interfaces";
import { Link } from "react-router-dom";
import Image from "@/shared/ui/Image/ui";

const RelatedItem: React.FC<Omit<Product, "id" | "category" | "ingredients" | "sizes" | "types">> = ({ description, imageUrl, price, rating, title }) => {
    return (
        <Link to={`/pizza/${title}`}>
            <article>
                <Image loading="lazy" alt={title} src={imageUrl} />
                <div className='flex flex-col gap-1'>
                    <h4 className='font-bold text-xl text-primary-black'>{getIntlPrice(price)}</h4>
                    <div className='flex gap-1 truncate'>
                        <h5 className='font-medium text-primary-black'>{title}</h5>
                        <span className='text-gray-400'>/</span>
                        <p className='truncate text-gray-400'>{description}</p>
                    </div>
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