import React from "react";
import getImageUrl from "../../../shared/lib/helpers/getImageUrl";
import getIntlPrice from "../../../shared/lib/helpers/getIntlPrice";
import { initialTypes } from "../../../shared/initialValues";
import { Props } from "../interfaces";

const OrderItem: React.FC<Props> = ({ pizzaId, id, title, price, type, size, count, imageUrl }) => {
    const [imageLoaded, setImageLoaded] = React.useState(false);

    return (
        <li>
            <div className='flex items-center gap-5 justify-between'>
                <div className='flex items-center gap-5'>
                    <img
                        loading='lazy'
                        width={100}
                        height={100}
                        src={imageLoaded ? imageUrl : getImageUrl("thumbnail.svg")}
                        alt={title}
                        onLoad={() => setImageLoaded(true)}
                    />
                    <div className='flex flex-col'>
                        <h2 className='text-primary-black text-lg font-medium mb-2'>{title}</h2>
                        <span className='text-gray-400'>Размер: {size}</span>
                        <span className='text-gray-400'>Тесто: {initialTypes[type]}</span>
                        <span className='text-gray-400'>Количество: {count}</span>
                    </div>
                </div>
                <span className='text-xl text-primary-black font-bold'>{getIntlPrice(price * count)}</span>
            </div>
        </li>
    );
};

export default OrderItem;