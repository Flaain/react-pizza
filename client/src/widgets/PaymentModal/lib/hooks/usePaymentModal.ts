import React from "react";
import { userSelector } from "@/shared/model/selectors";
import { useAppSelector } from "@/shared/model/store";
import { PaymentInfo } from "../../model/interfaces";
import { useDispatch } from "react-redux";
import { setPaymentInfo } from "@/app/redux/slice/user.slice";
import { api } from "@/shared/api";

export const usePaymentModal = (onClose: () => void) => {
    const { paymentInfo, isAuthenticated, token } = useAppSelector(userSelector);

    const [currentInfo, setCurrentInfo] = React.useState<PaymentInfo | null>(paymentInfo);
    const [loading, setLoading] = React.useState(false);

    const isSaveBtnDisabled = !currentInfo || paymentInfo?.method === currentInfo?.method || loading;

    const dispatch = useDispatch();

    const handleSave = React.useCallback(async () => {
        try {
            setLoading(true);

            isAuthenticated && (await api.user.updatePaymentInfo({ 
                token: token as string, 
                body: JSON.stringify(currentInfo!) 
            }));

            dispatch(setPaymentInfo(currentInfo!));
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [currentInfo]);

    return {
        currentInfo,
        setCurrentInfo,
        isSaveBtnDisabled,
        handleSave,
    };
};