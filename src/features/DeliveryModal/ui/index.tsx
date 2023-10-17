import React from "react";
import parseJSON from "../../../shared/lib/helpers/parseJSON";
import Tabs from "../../../widgets/Tabs/ui";
import ModalContainer from "../../../shared/ui/ModalContainer/ui";
import ModalBody from "../../../shared/ui/ModalBody/ui";
import ModalHeader from "../../../shared/ui/ModalHeader/ui";
import Spinner from "../../../shared/ui/Spinner/ui";
import { InitialDelivery, Props } from "../interfaces";
import { DeliveryInfo } from "../../../pages/Cart/interfaces";
import { AppContext, CartContext, DeliveryModalContext } from "../../../app/context";
import { api } from "../../../shared/api";
import { USER_ADDRESSES_KEY } from "../../../shared/initialValues";

const DeliveryModal: React.FC<Props> = ({ title }) => {
    const { deliveryInfo, setDeliveryInfo } = React.useContext(CartContext);
    const { setSearchParams } = React.useContext(AppContext);

    const [modalLoading, setModalLoading] = React.useState(true);
    const [currentInfo, setCurrentInfo] = React.useState<DeliveryInfo | null>(deliveryInfo ?? null);
    const [initialDelivery, setInitialDelivery] = React.useState<Array<InitialDelivery>>([
        {
            name: "Самовывозом",
            addresses: [],
        },
        {
            name: "Курьером",
            addresses: parseJSON(USER_ADDRESSES_KEY) ?? [],
            isEditable: true,
            isAddable: true,
        },
    ]);

    React.useEffect(() => {
        let ignore = false;

        (async () => {
            try {
                const { data } = await api.getStaticAddresses();
                if (!ignore) {
                    setInitialDelivery((prevState) =>
                        prevState.map((item) => {
                            if (item.name === "Самовывозом") {
                                return {
                                    ...item,
                                    addresses: [...item.addresses, ...data],
                                };
                            }
                            return item;
                        })
                    );
                }
            } catch (error) {
                console.log(error);
            } finally {
                setModalLoading(false);
            }
        })();
        return () => {
            ignore = true;
        };
    }, []);

    const deleteParam = (key: string) => {
        setSearchParams((prevState) => {
            prevState.delete(key);
            return prevState;
        });
    };

    return (
        <DeliveryModalContext.Provider
            value={{
                currentInfo,
                setCurrentInfo,
                initialDelivery,
                setInitialDelivery,
                deliveryInfo,
                setDeliveryInfo,
            }}
        >
            <ModalContainer paramsUpdater={() => deleteParam('delivery-method')}>
                <ModalBody>
                    <ModalHeader {...{ title, closeHandler: () => deleteParam('delivery-method') }} />
                    {modalLoading ? <Spinner /> : <Tabs />}
                </ModalBody>
            </ModalContainer>
        </DeliveryModalContext.Provider>
    );
};

export default DeliveryModal;