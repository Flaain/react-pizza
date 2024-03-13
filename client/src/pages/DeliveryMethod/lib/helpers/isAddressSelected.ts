import { IStaticAddress, IUserAddress } from "@/shared/model/interfaces";
import { DeliveryInfo } from "../../model/interfaces";

export const isAddressSelected = (currentInfo: DeliveryInfo | null, address: IStaticAddress | IUserAddress) => {
    return (
        currentInfo &&
        (
            ("id" in currentInfo.address && "id" in address && currentInfo.address.id === address.id) ||
            ("_id" in currentInfo.address && "_id" in address && currentInfo.address._id === address._id)
        )
    );
};