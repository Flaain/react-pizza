import React from "react";
import TabStaticAddresses from "./TabStaticAddresses";
import TabUserAddresses from "./TabUserAddresses";
import { useAppSelector } from "@/shared/model/store";
import { userSelector } from "@/shared/model/selectors";
import { useAsyncValue, useNavigate } from "react-router-dom";
import { Address } from "@/shared/model/interfaces";
import { Data } from "@/shared/api/interfaces";
import { DeliveryMethod } from "@/pages/DeliveryMethod/model/interfaces";
import { DeliveryInfo } from "@/pages/Cart";
import { ChangeAddressHandlerArgs } from "../model/interfaces";
import { useDispatch } from "react-redux";
import { setDeliveryInfo } from "@/app/redux/slice/user.slice";
import TabSelectors from "./TabSelectors";

const Tabs = () => {
    const { addresses: userAddresses, deliveryInfo } = useAppSelector(userSelector);
    const { data: staticAddresses } = useAsyncValue() as Data<Array<Address>>;

    const { 0: deliveryMethods, 1: setDeliveryMethods } = React.useState<Array<DeliveryMethod>>([
        { name: "Самовывозом", addresses: staticAddresses, component: TabStaticAddresses, method: "pickup" },
        { name: "Курьером", addresses: [...userAddresses.values()], component: TabUserAddresses, method: "courier" },
    ]); /* I decided to not create a polymorphic component like "TabContent" or smth like that cuz 
        each method can have its own complicated logic. For example, in the courier method, 
        we should allow the user to add their own addresses, and each user address can be deletable and editable, unlike the pickup method. */

    const { 0: currentInfo, 1: setCurrentInfo } = React.useState<DeliveryInfo | null>(deliveryInfo);
    const { 0: tabIndex, 1: setTabIndex } = React.useState(0);

    const isSaveBtnDisabled =
        !deliveryMethods[tabIndex].addresses.length ||
        !currentInfo ||
        currentInfo.address === deliveryInfo?.address ||
        deliveryMethods[tabIndex].method !== currentInfo?.method;

    const ActiveTabComponent = deliveryMethods[tabIndex].component;
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = React.useCallback((info: DeliveryInfo) => {
        setCurrentInfo(info);
    }, [deliveryMethods, tabIndex]);

    const handleSave = () => {
        dispatch(setDeliveryInfo(currentInfo!));
        navigate("/cart");
    };

    return (
        <>
            <TabSelectors items={deliveryMethods} setTabIndex={setTabIndex} tabIndex={tabIndex} />
            <ActiveTabComponent
                isSaveBtnDisabled={isSaveBtnDisabled}
                handleChange={handleChange}
                handleSave={handleSave}
                activeTab={deliveryMethods[tabIndex]}
                currentInfo={currentInfo}
                setCurrentInfo={setCurrentInfo}
            />
        </>
    );
};

export default Tabs;