import React from "react";
import parseJSON from "../../../shared/lib/helpers/parseJSON";
import Tabs from "../../../widgets/Tabs/ui";
import ModalContainer from "../../../shared/ui/ModalContainer/ui";
import ModalBody from "../../../shared/ui/ModalBody/ui";
import ModalHeader from "../../../shared/ui/ModalHeader/ui";
import Spinner from "../../../shared/ui/Spinner/ui";
import { InitialDelivery, Props } from "../interfaces";
import { DeliveryInfo } from "../../../pages/Cart/interfaces";
import { CartContext, DeliveryModalContext } from "../../../app/context";
import { api } from "../../../shared/api";
import { USER_ADDRESSES_KEY } from "../../../shared/initialValues";

const DeliveryModal: React.FC<Props> = ({ title }) => {
    const { deliveryInfo, setDeliveryInfo, setDeliveryModalOpened } = React.useContext(CartContext);

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

    return (
        <DeliveryModalContext.Provider
            value={{
                currentInfo,
                setCurrentInfo,
                initialDelivery,
                setInitialDelivery,
                deliveryInfo,
                setDeliveryInfo,
                setDeliveryModalOpened,
            }}
        >
            <ModalContainer updater={setDeliveryModalOpened}>
                <ModalBody>
                    <ModalHeader {...{ title, closeHandler: () => setDeliveryModalOpened(false) }} />
                    {modalLoading ? <Spinner /> : <Tabs />}
                </ModalBody>
            </ModalContainer>
        </DeliveryModalContext.Provider>
    );
};

export default DeliveryModal;