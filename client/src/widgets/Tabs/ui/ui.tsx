import React from "react";
import TabStaticAddresses from "./TabStaticAddresses";
import TabUserAddresses from "./TabUserAddresses";
import TabSelectors from "./TabSelectors";
import { useAppSelector } from "@/shared/model/store";
import { userSelector } from "@/shared/model/selectors";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DeliveryInfo, DeliveryMethod } from "@/pages/DeliveryMethod/model/interfaces";
import { useDispatch } from "react-redux";
import { setDeliveryInfo } from "@/app/redux/slice/user.slice";

const Tabs = () => {
    const { deliveryInfo } = useAppSelector(userSelector);

    const [searchParams, setSearchParams] = useSearchParams();
    const [currentInfo, setCurrentInfo] = React.useState<DeliveryInfo | null>(deliveryInfo);

    const handleChange = (info: DeliveryInfo) => {
        setCurrentInfo(info);
    };

    const handleSave = () => {
        dispatch(setDeliveryInfo(currentInfo!));
        navigate("/cart");
    };

    const deliveryMethods: Array<DeliveryMethod> = [
        {
            name: "Самовывозом", // maybe better to put it in constant
            component: (
                <TabStaticAddresses
                    currentInfo={currentInfo}
                    handleChange={handleChange}
                    handleSave={handleSave}
                    method='pickup'
                />
            ),
        },
        {
            name: "Курьером",
            component: (
                <TabUserAddresses
                    currentInfo={currentInfo}
                    handleChange={handleChange}
                    handleSave={handleSave}
                    method='courier'
                />
            ),
        },
    ]; /* I decided to not create a polymorphic component like "TabContent" or smth like that cuz 
        each method can have its own complicated logic. For example, in the courier method, 
        we should allow the user to add their own addresses, and each user address can be deletable and editable, unlike the pickup method. */

    const [selectedDeliveryMethodIndex, setSelectedDeliveryMethodIndex] = React.useState(() => {
        const tab = Number(searchParams.get("method")) || 0;
        return deliveryMethods[tab] ? tab : 0;
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <>
            <TabSelectors
                items={deliveryMethods}
                selectedDeliveryMethodIndex={selectedDeliveryMethodIndex}
                setSelectedDeliveryMethodIndex={setSelectedDeliveryMethodIndex}
                setSearchParams={setSearchParams}
            />
            {deliveryMethods[selectedDeliveryMethodIndex].component}
        </>
    );
};

export default Tabs;