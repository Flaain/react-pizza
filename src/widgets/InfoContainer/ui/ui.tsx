import DeliveryInfoList from "@/widgets/DeliveryInfoList/ui";
import PaymentInfoList from "@/widgets/PaymentInfoList/ui/ui";
import getIntlPrice from "@/shared/lib/helpers/getIntlPrice";

import { InfoBlock } from "@/features/InfoBlock";
import { useAppSelector } from "@/shared/model/store";
import { cartSelector, userSelector } from "@/shared/model/selectors";
import { useNavigate } from "react-router-dom";
import { routerList } from "@/shared/config/constants";
import { Props } from "../model/interfaces";

const InfoContainer = ({ disabled, setPaymentModalOpened }: Props) => {
    const { deliveryInfo, paymentInfo } = useAppSelector(userSelector);
    const { priceView: { total } } = useAppSelector(cartSelector);

    const navigate = useNavigate();

    return (
        <div className='grid grid-cols-2'>
            <InfoBlock
                item={<DeliveryInfoList {...deliveryInfo!} />}
                callToActionReason={!!deliveryInfo}
                callToActionText='заполните форму доставки'
                disabled={disabled}
                title='Способ доставки'
                updater={() => navigate(routerList.CART.children.DELIVERY_METHOD)}
            />
            <InfoBlock
                item={<PaymentInfoList {...paymentInfo!} total={getIntlPrice(total + (deliveryInfo?.deliveryPrice ?? 0))} />}
                callToActionReason={!!paymentInfo}
                callToActionText='заполните форму оплаты'
                disabled={disabled}
                title='Способ оплаты'
                updater={() => setPaymentModalOpened(true)}
            />
        </div>
    );
};

export default InfoContainer;