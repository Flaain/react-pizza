import React from "react";
import DeliveryInfoList from "../../DeliveryInfoList/ui";
import InfoCartBlock from "../../../features/InfoCartBlock/ui";
import { CartContext } from "../../../app/context";
import PaymentInfoList from "../../PaymentInfoList/ui";

const InfoCartContainer = () => {
    const { deliveryInfo, orderLoading, setDeliveryModalOpened, paymentInfo, setPaymentInfoModalOpened } = React.useContext(CartContext);
    
    return (
        <div className='grid grid-cols-2'>
            <InfoCartBlock
                callToActionItem={<DeliveryInfoList {...deliveryInfo!} />}
                callToActionReason={deliveryInfo!}
                callToActionText='заполните форму доставки'
                disabled={orderLoading}
                title='Способ доставки'
                updater={setDeliveryModalOpened}
            />
            <InfoCartBlock
                callToActionItem={<PaymentInfoList {...paymentInfo!} />}
                callToActionReason={paymentInfo!}
                callToActionText='заполните форму оплаты'
                disabled={orderLoading}
                title='Способ оплаты'
                updater={setPaymentInfoModalOpened}
            />
        </div>
    );
};

export default InfoCartContainer;