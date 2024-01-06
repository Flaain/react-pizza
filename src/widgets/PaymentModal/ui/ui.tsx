import React from "react";
import ModalContainer from "@/shared/ui/ModalContainer/ui";
import ModalBody from "@/shared/ui/ModalBody/ui";
import ModalHeader from "@/shared/ui/ModalHeader/ui";
import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import saveToLocalStorage from "@/shared/lib/helpers/saveToLocalStorage";
import PaymentMain from "@/features/PaymentMain/ui/ui";

import { localStorageKeys } from "@/shared/config/constants";
import { useAppSelector } from "@/shared/model/store";
import { userSelector } from "@/shared/model/selectors";
import { Menu, Menus, PaymentInfo, Props } from "../model/interfaces";

const PaymentModal = ({ closeHandler }: Props) => {
    const { paymentInfo } = useAppSelector(userSelector);

    const [activeMenu, setActiveMenu] = React.useState<Menu>("main");
    const [prevMenu, setPrevMenu] = React.useState<Menu | null>(null);
    const [currentInfo, setCurrentInfo] = React.useState<PaymentInfo | null>(paymentInfo);

    const handleSave = () => {
        saveToLocalStorage({ key: localStorageKeys.PAYMENT_INFO, data: currentInfo });
    };

    const menus: Menus = {
        main: {
            component: (
                <PaymentMain
                    closeHandler={closeHandler}
                    currentInfo={currentInfo}
                    handleSave={handleSave}
                    setActiveMenu={setActiveMenu}
                    setCurrentInfo={setCurrentInfo}
                />
            ),
            title: "Способ оплаты",
        },
        // "add-card": { component: <PaymentAddCard />, title: "Привязка карты" },
        // "choose-card": { component: <PaymentUserCards />, title: "Выбор карты" },
    };

    return (
        <ModalContainer closeHandler={closeHandler}>
            <ModalBody>
                <div className='flex items-center gap-5'>
                    {activeMenu !== "main" && prevMenu && (
                        <button
                            className='flex items-center justify-center p-2 min-w-[30px] min-h-[30px] rounded-full bg-primary-gray'
                            onClick={() => setActiveMenu(prevMenu)}
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
    );
};

export default PaymentModal;