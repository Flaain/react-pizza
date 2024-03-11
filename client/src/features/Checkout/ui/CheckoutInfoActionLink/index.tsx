import cn from "@/shared/lib/classNames";
import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import { Link } from "react-router-dom";
import { CheckoutInfoActionLinkProps } from "../../model/interfaces";
import { maxAddressLength } from "@/shared/config/constants";
import { DeliveryMethodType } from "@/pages/DeliveryMethod/model/interfaces";

const titles: Record<DeliveryMethodType, string> = {
    pickup: "Доставка в пункт выдачи",
    delivery: "Доставка курьером",
};

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
                {titles[deliveryInfo.method]}
                <img src={getImageUrl("pen.svg")} alt='edit delivery info' />
            </Link>
            <p
                className={cn(
                    "text-gray-400",
                    deliveryInfo.address.line.length > maxAddressLength ? "truncate" : "break-words"
                )}
            >
                {deliveryInfo.address.line}
                {"rating" in deliveryInfo.address && (
                    <span className='inline-flex items-center gap-2 ml-2'>
                        <img src={getImageUrl("rating.svg")} width={15} height={15} alt='rating star' />
                        {deliveryInfo.address.rating}
                    </span>
                )}
            </p>
        </div>
    );
};

export default CheckoutInfoActionLink;