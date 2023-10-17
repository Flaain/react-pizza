import React from "react";
import DeliveryInfoList from "../../DeliveryInfoList/ui";
import InfoCartBlock from "../../../features/InfoCartBlock/ui";
import { AppContext, CartContext } from "../../../app/context";
import PaymentInfoList from "../../PaymentInfoList/ui";

const InfoCartContainer = () => {
    const { deliveryInfo, orderLoading, paymentInfo, setPaymentInfoModalOpened } = React.useContext(CartContext);
    const { setSearchParams } = React.useContext(AppContext);

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