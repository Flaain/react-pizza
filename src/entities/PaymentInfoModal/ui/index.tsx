import React from "react";
import PaymentMain from "../../../features/PaymentMain/ui";
import PaymentAddCard from "../../../features/PaymentAddCard/ui";
import ModalContainer from "../../../shared/ui/ModalContainer/ui";
import ModalBody from "../../../shared/ui/ModalBody/ui";
import ModalHeader from "../../../shared/ui/ModalHeader/ui";
import parseJSON from "../../../shared/lib/helpers/parseJSON";
import PaymentUserCards from "../../../features/PaymentUserCards/ui";
import getImageUrl from "../../../shared/lib/helpers/getImageUrl";
import saveToLocalStorage from "../../../shared/lib/helpers/saveToLocalStorage";
import { AvaiblePaymentMenus } from "../../../app/context/types";
import { CartContext, PaymentModalContext } from "../../../app/context";
import { PAYMENT_INFO_KEY, USER_CARDS_KEY } from "../../../shared/initialValues";
import { CreditCard, PaymentInfo } from "../../../pages/Cart/interfaces";
import { Menus, Props } from "../interfaces";

const PaymentInfoModal: React.FC<Props> = ({ closeHandler }) => {
    const { setPaymentInfoModalOpened, setPaymentInfo, paymentInfo } = React.useContext(CartContext);
    const [activeMenu, setActiveMenu] = React.useState<AvaiblePaymentMenus>("main");
    const [currentInfo, setCurrentInfo] = React.useState<PaymentInfo | null>(paymentInfo ?? null);
    const [userCards, setUserCards] = React.useState<Array<CreditCard>>(parseJSON(USER_CARDS_KEY) ?? []);
    
    const menus: Menus = {
        "main": { component: <PaymentMain />, title: "Способ оплаты" },
        "add-card": { component: <PaymentAddCard />, title: "Привязка карты" },
        "choose-card": { component: <PaymentUserCards />, title: "Выбор карты" },
    };

    const handleSave = () => {
        setPaymentInfo(currentInfo);
        setPaymentInfoModalOpened(false);
        saveToLocalStorage({ key: PAYMENT_INFO_KEY, data: JSON.stringify(currentInfo) });
    };

    return (
        <PaymentModalContext.Provider
            value={{
                setActiveMenu,
                menus,
                setCurrentInfo,
                currentInfo,
                activeMenu,
                paymentInfo,
                handleSave,
                setUserCards,
                userCards,
            }}
        >
            <ModalContainer stateUpdater={setPaymentInfoModalOpened}>
                <ModalBody>
                    <div className='flex items-center gap-5'>
                        {activeMenu !== "main" && (
                            <button
                                className='flex items-center justify-center p-2 min-w-[30px] min-h-[30px] rounded-full bg-primary-gray'
                                onClick={() => setActiveMenu("main")}
                                title='Вернуться назад'
                            >
                                <img src={getImageUrl("arrow.svg")} alt='back arrow' className='mr-[2px]' />
                            </button>
                        )}
                        <ModalHeader title={menus[activeMenu].title} closeHandler={closeHandler} />
                    </div>
                    {menus[activeMenu].component}
                </ModalBody>
            </ModalContainer>
        </PaymentModalContext.Provider>
    );
};

export default PaymentInfoModal;