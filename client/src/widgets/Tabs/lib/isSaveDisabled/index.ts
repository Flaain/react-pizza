import { DeliveryInfo, DeliveryMethodType } from "@/pages/DeliveryMethod/model/interfaces";

const isSaveDisabled = (
    method: DeliveryMethodType,
    currentInfo: DeliveryInfo | null,
    deliveryInfo: DeliveryInfo | null
) => {
    return (
        !currentInfo ||
        ("id" in currentInfo.address ? currentInfo.address.id : currentInfo.address._id) ===
        (deliveryInfo && ("id" in deliveryInfo.address ? deliveryInfo.address.id : deliveryInfo.address._id)) ||
        method !== currentInfo?.method
    );
};

export default isSaveDisabled;
