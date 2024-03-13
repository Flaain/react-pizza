import React from "react";
import { userSelector } from "@/shared/model/selectors";
import { useAppSelector } from "@/shared/model/store";
import { useAsyncValue, useSearchParams } from "react-router-dom";
import { DeliveryInfo, DeliveryMethodType } from "@/pages/DeliveryMethod/model/interfaces";
import { IApiData, IStaticAddress } from "@/shared/model/interfaces";
import { useTabSlider } from "@/shared/hooks/useTabSlider";

const initalTabs: Array<{ value: string; method: DeliveryMethodType }> = [
    { value: "Самовывоз", method: "pickup" },
    { value: "Курьером", method: "delivery" },
];

export const useDeliveryMethodTabs = () => {
    const { deliveryInfo, addresses: userAddresses } = useAppSelector(userSelector);
    const { data: staticAddresses } = useAsyncValue() as IApiData<Array<IStaticAddress>>;

    const items = React.useMemo(() => ({ pickup: staticAddresses, delivery: [...userAddresses.values()] }), []);

    const [searchParams, setSearchParams] = useSearchParams();
    const [currentInfo, setCurrentInfo] = React.useState<DeliveryInfo | null>(deliveryInfo);
    const [tab, setTab] = React.useState(() => {
        const tab = Number(searchParams.get("method")) || 0;
        return initalTabs[tab] ? tab : 0;
    });

    const { tabLeft, tabRef, tabWidth, setActiveTabIndex } = useTabSlider<HTMLLIElement>(tab);

    const handleMethodChange = React.useCallback((index: number) => {
        setActiveTabIndex(index);
        setTab(index);
        setSearchParams((prevState) => {
            prevState.set("method", String(index));
            return prevState;
        }, { replace: true });
    }, []);

    const handleAddressChange = React.useCallback((info: Omit<DeliveryInfo, "method">) => {
        setCurrentInfo({ ...info, method: initalTabs[tab].method });
    }, []);

    // const isSaveBtnDisabled = !currentInfo ||
    // ("id" in currentInfo.address ? currentInfo.address.id : currentInfo.address._id) ===
    // (deliveryInfo && ("id" in deliveryInfo.address ? deliveryInfo.address.id : deliveryInfo.address._id)) ||
    // initalTabs[tab] !== currentInfo?.method

    return {
        searchParams,
        currentInfo,
        tab,
        initalTabs,
        addresses: items[initalTabs[tab].method as keyof typeof items],
        slider: { tabLeft, tabRef, tabWidth },
        handleMethodChange,
        handleAddressChange,
        // isSaveBtnDisabled
    };
};
