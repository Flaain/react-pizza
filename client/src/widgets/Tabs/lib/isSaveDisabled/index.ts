import { DeliveryInfo, DeliveryMethodType } from "@/pages/DeliveryMethod/model/interfaces";

const isSaveDisabled = (method: DeliveryMethodType, currentInfo: DeliveryInfo | null, deliveryInfo: DeliveryInfo | null) => {
    return !currentInfo || currentInfo.address === deliveryInfo?.address || method !== currentInfo?.method;
};

export default isSaveDisabled;