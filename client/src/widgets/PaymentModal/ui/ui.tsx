import PaymentMain from "./PaymentMain";
import cn from "@/shared/lib/classNames";

import { usePaymentModal } from "../lib/hooks/usePaymentModal";
import { Props } from "../model/interfaces";
import { Modal } from "@/shared/ui/Modal";

const PaymentModal = ({ closeHandler }: Props) => {
    const { currentInfo, setCurrentInfo, handleSave, isSaveBtnDisabled } = usePaymentModal(closeHandler);

    return (
        <Modal closeHandler={closeHandler} title='Способ оплаты'>
            <PaymentMain currentInfo={currentInfo} setCurrentInfo={setCurrentInfo} />
            <div className='flex items-center gap-5 mt-auto'>
                <button
                    onClick={handleSave}
                    disabled={isSaveBtnDisabled}
                    className={cn(
                        "flex items-center justify-center py-2 px-5 rounded-lg bg-primary-orange text-white",
                        isSaveBtnDisabled && "opacity-50"
                    )}
                >
                    Сохранить
                </button>
                <button
                    onClick={closeHandler}
                    className='bg-primary-orange/10 py-2 px-5 rounded-lg text-primary-orange hover:bg-primary-orange/20 transition-colors duration-200 ease-in-out'
                >
                    Отмена
                </button>
            </div>
        </Modal>
    );
};

export default PaymentModal;