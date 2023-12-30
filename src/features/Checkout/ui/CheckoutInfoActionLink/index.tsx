import cn from "@/shared/lib/classNames";
import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import { Link } from "react-router-dom";
import { CheckoutInfoActionLinkProps } from "../../model";
import { maxAddressLength } from "@/shared/config/constants";

const CheckoutInfoActionLink = ({ deliveryInfo, ...rest }: CheckoutInfoActionLinkProps) => {
    return (
        <div className='flex flex-col'>
            <Link
                {...rest}
                className={
                    rest.className ??
                    "flex items-center justify-between group text-base font-medium text-primary-black hover:text-primary-orange"
                }
            >
                {deliveryInfo?.method === "pickup" ? "Доставка в пункт выдачи" : "Доставка курьером"}
                <img src={getImageUrl("pen.svg")} alt='edit delivery info' />
            </Link>
            <p
                className={cn(
                    "text-gray-400",
                    deliveryInfo?.address.length > maxAddressLength ? "truncate" : "break-words"
                )}
            >
                {deliveryInfo?.address}
                {deliveryInfo?.rating && (
                    <span className='inline-flex items-center gap-2 ml-2'>
                        <img src={getImageUrl("rating.svg")} width={15} height={15} alt='rating star' />
                        {deliveryInfo?.rating}
                    </span>
                )}
            </p>
        </div>
    );
};

export default CheckoutInfoActionLink;
