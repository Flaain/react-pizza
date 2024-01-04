import { DeliveryInfo } from "@/pages/Cart";
import { DeliveryMethod } from "@/pages/DeliveryMethod/model/interfaces";

const isSaveDisabled = (
    deliveryMethods: Array<DeliveryMethod>,
    selectedDeliveryMethod: number,
    currentInfo: DeliveryInfo | null,
    deliveryInfo: DeliveryInfo | null
) => {
    return (
        !deliveryMethods[selectedDeliveryMethod].addresses.length ||
        !currentInfo ||
        currentInfo.address === deliveryInfo?.address ||
        deliveryMethods[selectedDeliveryMethod].method !== currentInfo?.method
    );
};

export default isSaveDisabled;