import cn from "@/shared/lib/classNames";
import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import { userSelector } from "@/shared/model/selectors";
import { useAppSelector } from "@/shared/model/store";
import { Link } from "react-router-dom";
import { useCart } from "@/pages/Cart/lib/hooks/useCart";
import getDataFromLocalStorage from "@/shared/lib/helpers/getDataFromLocalStorage";
import React from "react";
import { localStorageKeys } from "@/shared/config/constants";
import saveToLocalStorage from "@/shared/lib/helpers/saveToLocalStorage";

const CheckoutControlsAuthGuard = () => {
    const [isAgreedWithTerms, setIsAgreedWithTerms] = React.useState(getDataFromLocalStorage(localStorageKeys.TERMS, false));

    const { deliveryInfo, paymentInfo, jwt } = useAppSelector(userSelector);
    const { handleOrder, orderLoading } = useCart();

    const isOrderBtnDisabled = !deliveryInfo || !paymentInfo || !isAgreedWithTerms || orderLoading;

    const handleChangeTerms = ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
        setIsAgreedWithTerms(checked);
        saveToLocalStorage({ key: localStorageKeys.TERMS, data: checked });
    };

    return jwt ? (
        <>
            <button
                onClick={handleOrder}
                type='button'
                className={cn(
                    "relative mt-2 min-w-full whitespace-nowrap min-h-[40px] group font-bold text-base text-white bg-primary-orange py-2 px-5 rounded-full flex items-center justify-center gap-2",
                    orderLoading &&
                        "after:absolute after:top-2/4 after:left-2/4 after:w-[20px] after:animate-loading after:h-[20px] after:border-[3px] after:border-t-transparent after:border-solid after:border-white after:rounded-full after:flex after:items-center after:justify-center",
                    (!deliveryInfo || !paymentInfo || !isAgreedWithTerms) && "opacity-50 cursor-default",
                    !isOrderBtnDisabled && "active:scale-[0.98]"
                )}
                disabled={isOrderBtnDisabled}
            >
                {orderLoading ? "" : "Заказать"}
            </button>
            <label className='cursor-pointer inline-block relative pl-7 leading-tight'>
                <div
                    className={cn(
                        "flex w-[20px] h-[20px] absolute left-0 top-[50%] translate-y-[-50%] rounded-md cursor-pointer bg-primary-gray transition-colors duration-200 ease-in-out",
                        isAgreedWithTerms && "bg-primary-orange"
                    )}
                >
                    <img
                        src={getImageUrl("check.svg")}
                        alt='check icon'
                        className={cn(
                            "transition-all duration-200 ease-in-out",
                            isAgreedWithTerms ? "opacity-100 visible" : "opacity-0 pointer-events-none invisible"
                        )}
                    />
                </div>
                <input className='sr-only' type='checkbox' checked={isAgreedWithTerms} onChange={handleChangeTerms} />
                <p className='text-sm text-gray-400 select-none'>
                    Соглашаюсь с&#32;
                    <Link to='#' className='text-primary-black hover:text-primary-orange'>
                        правилами пользования торговой площадкой
                    </Link>
                    &#32;и&#32;
                    <Link to='#' className='text-primary-black hover:text-primary-orange'>
                        возврата
                    </Link>
                </p>
            </label>
        </>
    ) : (
        <p className='text-sm text-gray-400 select-none mt-2 leading-snug break-words'>
            Пожалуйста,&#32;
            <Link to='/auth?from=cart' className='text-primary-orange'>
                войдите
            </Link>
            &#32; или&#32;
            <Link to='/auth?from=cart' className='text-primary-orange'>
                зарегистрируйтесь
            </Link>
            , чтобы оформить заказ
        </p>
    );
};

export default CheckoutControlsAuthGuard;