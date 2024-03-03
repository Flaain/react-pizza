import cn from "@/shared/lib/classNames";
import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import CheckoutSummary from "./CheckoutSummary";
import CheckoutTotal from "./CheckoutTotal";

import { userSelector } from "@/shared/model/selectors";
import { CheckoutProps } from "../model/interfaces";
import { useAppSelector } from "@/shared/model/store";
import { useNavigate } from "react-router-dom";
import { routerList } from "@/shared/config/constants";

const Checkout = ({ setPaymentModalOpened }: CheckoutProps) => {
    const { deliveryInfo, paymentInfo } = useAppSelector(userSelector);

    const navigate = useNavigate();

    const handleFormFill = () => {
        deliveryInfo ? setPaymentModalOpened(true) : navigate(routerList.CART.children.DELIVERY_METHOD);
    };

    return (
        <div
            className={cn(
                "overflow-hidden row-start-1 col-start-6 col-end-8 sticky top-5 flex flex-col self-start justify-between gap-5 col-span-2 p-5 rounded-xl bg-white shadow-xl border border-solid border-primary-gray"
            )}
        >
            {deliveryInfo && paymentInfo ? (
                <CheckoutSummary setPaymentModalOpened={setPaymentModalOpened} />
            ) : (
                <button className='flex items-center justify-between group' onClick={handleFormFill}>
                    <span className='text-lg text-primary-black font-medium group-hover:text-primary-orange'>
                        Заполните форму {deliveryInfo ? "оплаты" : "доставки"}
                    </span>
                    <img
                        src={getImageUrl("pen.svg")}
                        alt={deliveryInfo ? "Заполните форму оплаты" : "Заполните форму доставки"}
                    />
                </button>
            )}
            <CheckoutTotal />
        </div>
    );
};

export default Checkout;