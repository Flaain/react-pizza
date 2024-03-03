import React from "react";
import ModalContainer from "@/shared/ui/ModalContainer/ui";
import ModalBody from "@/shared/ui/ModalBody/ui";
import ModalHeader from "@/shared/ui/ModalHeader/ui";
import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import PaymentMain from "./PaymentMain/ui";

import { useAppSelector } from "@/shared/model/store";
import { userSelector } from "@/shared/model/selectors";
import { Menu, Menus, PaymentInfo, Props } from "../model/interfaces";
import { useDispatch } from "react-redux";
import { setPaymentInfo } from "@/app/redux/slice/user.slice";

const PaymentModal = ({ closeHandler }: Props) => {
    const { paymentInfo } = useAppSelector(userSelector);

    const [activeMenu, setActiveMenu] = React.useState<Menu>("main");
    const [currentInfo, setCurrentInfo] = React.useState<PaymentInfo | null>(paymentInfo);

    const dispatch = useDispatch();

    const handleSave = () => {
        dispatch(setPaymentInfo(currentInfo as PaymentInfo));
        closeHandler();
    };

    const menus: Menus = {
        main: {
            component: <PaymentMain {...{ currentInfo, handleSave, setActiveMenu, setCurrentInfo, closeHandler }} />,
            title: "Способ оплаты",
        },
        // "add-card": { component: <div>add card</div>, title: "Привязка карты" },
        // "choose-card": {
        //     component: <ChooseCard {...props} />,
        //     title: "Выбор карты",
        // },
    };

    return (
        <ModalContainer closeHandler={closeHandler}>
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
    );
};

export default PaymentModal;