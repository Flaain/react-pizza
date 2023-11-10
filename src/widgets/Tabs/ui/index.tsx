import React from "react";
import cn from "../../../shared/lib/classNames";
import TabContent from "../../../features/TabContent/ui";
import AddressAddForm from "../../../features/AddressAddForm/ui";
import saveToLocalStorage from "../../../shared/lib/helpers/saveToLocalStorage";
import TabsSelectors from "../../../features/TabsSelectors/ui";
import getDataFromLocalStorage from "../../../shared/lib/helpers/getDataFromLocalStorage";
import { localStorageKeys } from "../../../shared/config/constants";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/redux";
import { DeliveryInfo } from "../../../pages/Cart";

const Tabs = () => {
    const { deliveryInfo } = useSelector(({ cart }: RootState) => cart);

    const [currentInfo, setCurrentInfo] = React.useState<DeliveryInfo | null>(deliveryInfo);
    const [showAddForm, setShowAddForm] = React.useState(false);
    const [query, setQuery] = React.useState("");

    const currentTabAddresses = React.useMemo(
        () => initialDelivery[indexTab]?.addresses?.every(({ address }) => address !== currentInfo?.address),
        [currentInfo, indexTab]
    );

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (query.trim().length) {
            const deliveryPrice = Math.floor(Math.random() * (500 - 100 + 1) + 100);

            setInitialDelivery((prevState) =>
                prevState.map((item, index) => {
                    if (index === indexTab) {
                        const addresses = [
                            ...item.addresses,
                            {
                                address: query.trim(),
                                deliveryPrice,
                            },
                        ];

                        saveToLocalStorage({ key: USER_ADDRESSES_KEY, data: JSON.stringify(addresses) });

                        return { ...item, addresses };
                    }
                    return item;
                })
            );

            setCurrentInfo({
                address: query.trim(),
                type: initialDelivery[indexTab].name,
                deliveryPrice,
            });
        }

        setQuery("");
        setShowAddForm(false);
    };

    const handleSave = () => {
        setDeliveryInfo(currentInfo);
        setSearchParams((prevState) => {
            prevState.delete('delivery-method');
            return prevState;
        });

        saveToLocalStorage(
            { key: DELIVERY_INFO_KEY, data: JSON.stringify(currentInfo) },
            { key: DELIVERY_MODAL_INDEX_KEY, data: indexTab }
        );
    };

    return (
        <>
            <TabsSelectors {...{ items: initialDelivery, indexTab, setIndexTab, setShowAddForm }} />
            {showAddForm ? (
                <AddressAddForm {...{ query, setQuery, setShowAddForm, handleSubmit }} />
            ) : !initialDelivery[indexTab]?.addresses?.length ? (
                <>
                    <p className='text-gray-400'>Нет сохранненых адресов</p>

                    {initialDelivery[indexTab].isAddable && (
                        <button
                            onClick={() => setShowAddForm(true)}
                            className='flex items-center justify-center self-start py-2 px-5 rounded-lg bg-primary-orange text-white mt-auto'
                        >
                            Добавить адрес доставки
                        </button>
                    )}
                </>
            ) : (
                <>
                    <TabContent
                        {...{
                            activeTab: initialDelivery[indexTab],
                            indexTab,
                            currentInfo,
                            setCurrentInfo,
                            deliveryInfo,
                            setDeliveryInfo,
                        }}
                    />
                    <div className='self-start mt-auto flex items-center gap-5'>
                        <button
                            onClick={handleSave}
                            disabled={!currentInfo || currentTabAddresses}
                            className={cn(
                                "flex items-center justify-center py-2 px-5 rounded-lg bg-primary-orange text-white",
                                (!currentInfo || currentTabAddresses) && "opacity-50"
                            )}
                        >
                            Сохранить
                        </button>
                        {initialDelivery[indexTab]?.isAddable && (
                            <button
                                onClick={() => setShowAddForm(true)}
                                className={cn(
                                    "flex items-center justify-center py-2 px-5 rounded-lg text-primary-orange font-medium"
                                )}
                            >
                                Добавить адрес доставки
                            </button>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default Tabs;