import React from "react";
import { userSelector } from "@/shared/model/selectors";
import { useAppSelector } from "@/shared/model/store";
import { useAsyncValue, useNavigate, useSearchParams } from "react-router-dom";
import { DeliveryInfo, DeliveryMethodType } from "@/pages/DeliveryMethod/model/interfaces";
import { Address, IApiData } from "@/shared/model/interfaces";
import { useTabSlider } from "@/shared/hooks/useTabSlider";
import { routerList } from "@/shared/config/constants";
import { api } from "@/shared/api";
import { useDispatch } from "react-redux";
import { setDeliveryInfo } from "@/app/redux/slice/user.slice";

const initalTabs: Array<{ value: string; method: DeliveryMethodType }> = [
    { value: "Самовывоз", method: "pickup" },
    { value: "Курьером", method: "delivery" },
];

export const useDeliveryMethodTabs = () => {
    const { deliveryInfo, addresses: userAddresses, isAuthenticated, token } = useAppSelector(userSelector);
    const { data: staticAddresses } = useAsyncValue() as IApiData<Array<Address>>;

    const items = React.useMemo(() => ({ pickup: staticAddresses, delivery: [...userAddresses.values()] }), []);

    const [searchParams, setSearchParams] = useSearchParams();
    const [currentInfo, setCurrentInfo] = React.useState<DeliveryInfo | null>(deliveryInfo);
    const [tab, setTab] = React.useState(() => {
        const tab = Number(searchParams.get("method")) || 0;
        return initalTabs[tab] ? tab : 0;
    });

    const { tabLeft, tabRef, tabWidth, setActiveTabIndex } = useTabSlider<HTMLLIElement>(tab);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
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
    }, [tab]);

    const handleSave = React.useCallback(async () => {
        if (!isAuthenticated) return navigate(routerList.AUTH);

        try {
            const { data: { deliveryInfo } } = await api.user.updateDeliveryInfo({ 
                token: token as string, 
                body: JSON.stringify({ 
                    id: currentInfo!.address.id, 
                    method: currentInfo!.method
                }) 
            })
            
            dispatch(setDeliveryInfo({ ...deliveryInfo, method: currentInfo!.method }));
            
            navigate(routerList.CART.main);
        } catch (error) {
            console.error(error);
        }
    }, [currentInfo, isAuthenticated, token]);

    const isSaveBtnDisabled = !currentInfo || deliveryInfo?.address.id === currentInfo.address.id || currentInfo.method !== initalTabs[tab].method;

    return {
        tab,
        searchParams,
        currentInfo,
        initalTabs,
        addresses: items[initalTabs[tab].method as keyof typeof items],
        slider: { tabLeft, tabRef, tabWidth },
        isSaveBtnDisabled,
        handleMethodChange,
        handleAddressChange,
        handleSave
    };
};
