import cn from "@/shared/lib/classNames";
import Input from "@/shared/ui/Input/ui";
import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import getIntlPrice from "@/shared/lib/helpers/getIntlPrice";
import Image from "@/shared/ui/Image/ui/ui";
import ImageSkeleton from "@/shared/ui/Image/ui/Skeleton";
import { CartItemProps } from "../../model/interfaces";
import { Link } from "react-router-dom";
import { initialTypes } from "@/shared/config/constants";
import { useCartItem } from "../../lib/hooks/useCartItem";

const CartItem = ({ _id, productId, count, imageUrl, size, title, type, price }: CartItemProps) => {
    const { 
        handleChange, 
        handleDecrease, 
        handleIncrease, 
        handleRemoveItemFromCart, 
        intlSize, 
        itemCount, 
        loading 
    } = useCartItem({ _id, productId, count, size, type });

    return (
        <li className='flex items-center justify-between group'>
            <div className='flex items-center gap-5'>
                <Image
                    src={imageUrl}
                    width={80}
                    height={80}
                    skeleton={<ImageSkeleton height={80} width={80} />}
                    loading='lazy'
                />
                <div className='flex flex-col'>
                    <Link
                        to={`/product/${productId}?size=${size}&type=${type}`}
                        className='text-primary-black text-lg font-medium hover:text-primary-orange transition-colors duration-200 ease-in-out'
                    >
                        {title}
                    </Link>
                    <span className='text-gray-400'>
                        {initialTypes[type]} тесто, {intlSize}
                    </span>
                </div>
            </div>
            <div className='flex justify-between items-start gap-5'>
                <div className='flex items-center gap-3'>
                    <button
                        className={cn(
                            "flex items-center justify-center w-[30px] h-[30px] font-bold box-border bg-primary-gray rounded",
                            itemCount <= 1 ? "text-gray-400" : "text-primary-black"
                        )}
                        disabled={itemCount <= 1 || loading}
                        onClick={handleDecrease}
                    >
                        -
                    </button>
                    <Input
                        className='text-lg font-medium appearance-none outline-none w-[30px] h-[30px] text-center'
                        type='number'
                        name='count'
                        value={itemCount}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <button
                        disabled={loading}
                        onClick={handleIncrease}
                        className='flex items-center justify-center w-[30px] h-[30px] font-bold box-border bg-primary-gray rounded'
                    >
                        +
                    </button>
                </div>
                <div className='flex items-center gap-4'>
                    <span className='text-xl min-w-[100px] flex justify-end font-medium'>
                        {getIntlPrice(itemCount * price)}
                    </span>
                    <button
                        disabled={loading}
                        onClick={handleRemoveItemFromCart}
                        className='group-hover:opacity-100 group-hover:pointer-events-auto opacity-0 pointer-events-none transition-opacity durta ease-in-out'
                    >
                        <img src={getImageUrl("bucket.svg")} alt='удалить' />
                    </button>
                </div>
            </div>
        </li>
    );
};

export default CartItem;
