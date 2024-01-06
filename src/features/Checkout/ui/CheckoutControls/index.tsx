import React from "react";
import getDataFromLocalStorage from "@/shared/lib/helpers/getDataFromLocalStorage";
import saveToLocalStorage from "@/shared/lib/helpers/saveToLocalStorage";
import CheckoutControlsAuthGuard from "../CheckoutControlsAuthGuard";
import { CheckoutControlsProps } from "../../model";
import { useAppSelector } from "@/shared/model/store";
import { cartSelector, userSelector } from "@/shared/model/selectors";
import { localStorageKeys } from "@/shared/config/constants";

const CheckoutControls = ({ handleOrder }: CheckoutControlsProps) => {
    const { deliveryInfo, paymentInfo } = useAppSelector(userSelector);
    const { orderLoading } = useAppSelector(cartSelector);

    const [showPromocodeForm, setShowPromocodeForm] = React.useState(false);
    const [isAgreedWithTerms, setIsAgreedWithTerms] = React.useState(getDataFromLocalStorage(localStorageKeys.TERMS, false));

    const isOrderBtnDisabled = !deliveryInfo || !paymentInfo || orderLoading || !isAgreedWithTerms;

    const handleChangeTerms = ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
        setIsAgreedWithTerms(checked);
        saveToLocalStorage({ key: localStorageKeys.TERMS, data: checked });
    };

    return (
        <>
            <button
                onClick={() => setShowPromocodeForm((prevState) => !prevState)}
                className='text-primary-black border-b border-dashed hover:text-primary-orange hover:border-primary-orange flex self-start'
            >
                {showPromocodeForm ? "У меня нет промокода" : "У меня есть промокод"}
            </button>
            {/* {showPromocodeForm && <PromocodeForm promocodes={promocodes} />} */}
            <CheckoutControlsAuthGuard
                handleChangeTerms={handleChangeTerms}
                handleOrder={handleOrder}
                isAgreedWithTerms={isAgreedWithTerms}
                isOrderBtnDisabled={isOrderBtnDisabled}
            />
        </>
    );
};

export default CheckoutControls;