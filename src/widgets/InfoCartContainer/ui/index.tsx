import React from "react";
import DeliveryInfoList from "../../DeliveryInfoList/ui";
import InfoCartBlock from "../../../features/InfoCartBlock/ui";
import PaymentInfoList from "../../PaymentInfoList/ui";

const InfoCartContainer = () => {
    return (
        <div className='grid grid-cols-2'>
            <InfoCartBlock
                callToActionItem={<DeliveryInfoList {...deliveryInfo!} />}
                callToActionReason={deliveryInfo!}
                callToActionText='заполните форму доставки'
                disabled={orderLoading}
                title='Способ доставки'
                paramsUpdater={() => setSearchParams((prevState) => {
                    prevState.set('delivery-method', 'true');
                    return prevState;
                })}
            />
            <InfoCartBlock
                callToActionItem={<PaymentInfoList {...paymentInfo!} />}
                callToActionReason={paymentInfo!}
                callToActionText='заполните форму оплаты'
                disabled={orderLoading}
                title='Способ оплаты'
                stateUpdater={setPaymentInfoModalOpened}
            />
        </div>
    );
};

export default InfoCartContainer;