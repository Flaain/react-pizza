import React from "react";
import TabStaticAddresses from "./TabStaticAddresses";
import TabUserAddresses from "./TabUserAddresses";
import TabSelectors from "./TabSelectors";
import isSaveDisabled from "../lib/isSaveDisabled";
import { useAppSelector } from "@/shared/model/store";
import { userSelector } from "@/shared/model/selectors";
import { useAsyncValue, useNavigate, useSearchParams } from "react-router-dom";
import { Address } from "@/shared/model/interfaces";
import { Data } from "@/shared/api/interfaces";
import { DeliveryMethod } from "@/pages/DeliveryMethod/model/interfaces";
import { DeliveryInfo } from "@/pages/Cart";
import { useDispatch } from "react-redux";
import { setDeliveryInfo } from "@/app/redux/slice/user.slice";

const Tabs = () => {
    const { addresses: userAddresses, deliveryInfo } = useAppSelector(userSelector);
    const { data: staticAddresses } = useAsyncValue() as Data<Array<Address>>;

    const [deliveryMethods, setDeliveryMethod] = React.useState<Array<DeliveryMethod>>([
        { name: "Самовывозом", addresses: staticAddresses, component: TabStaticAddresses, method: "pickup" },
        { name: "Курьером", addresses: [...userAddresses.values()], component: TabUserAddresses, method: "courier" },
    ]); /* I decided to not create a polymorphic component like "TabContent" or smth like that cuz 
        each method can have its own complicated logic. For example, in the courier method, 
        we should allow the user to add their own addresses, and each user address can be deletable and editable, unlike the pickup method. */

    const [searchParams, setSearchParams] = useSearchParams();
    const [currentInfo, setCurrentInfo] = React.useState<DeliveryInfo | null>(deliveryInfo);
    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = React.useState(() => {
        const tab = Number(searchParams.get("method")) || 0;
        return deliveryMethods[tab] ? tab : 0;
    });

    const isSaveBtnDisabled = isSaveDisabled(deliveryMethods, selectedDeliveryMethod, currentInfo, deliveryInfo);

    const ActiveTabComponent = deliveryMethods[selectedDeliveryMethod].component;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = React.useCallback((info: DeliveryInfo) => {
        setCurrentInfo(info);
    }, [deliveryMethods, selectedDeliveryMethod]);

    const handleSave = () => {
        dispatch(setDeliveryInfo(currentInfo!));
        navigate("/cart");
    };

    return (
        <>
            <TabSelectors
                items={deliveryMethods}
                setTabIndex={setSelectedDeliveryMethod}
                tabIndex={selectedDeliveryMethod}
                setSearchParams={setSearchParams}
            />
            <ActiveTabComponent
                isSaveBtnDisabled={isSaveBtnDisabled}
                handleChange={handleChange}
                handleSave={handleSave}
                activeTab={deliveryMethods[selectedDeliveryMethod]}
                currentInfo={currentInfo}
                setCurrentInfo={setCurrentInfo}
            />
        </>
    );
};

export default Tabs;