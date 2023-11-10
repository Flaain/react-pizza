import React from "react";
import Tabs from "../../../widgets/Tabs/ui";
import ModalContainer from "../../../shared/ui/ModalContainer/ui";
import ModalBody from "../../../shared/ui/ModalBody/ui";
import ModalHeader from "../../../shared/ui/ModalHeader/ui";
import Spinner from "../../../shared/ui/Spinner/ui";

import { Props } from "../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { deliveyrModalSelector } from "../store/selectors";
import { fetchStaticAddresses } from "../store/asyncActions";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../../app/redux";
import { clearDeliveryModalStore } from "../store/slice";
import { useSearchParams } from "react-router-dom";

const DeliveryModal: React.FC<Props> = ({ title }) => {
    const { loading, deliveryMethods } = useSelector(deliveyrModalSelector);

    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();

    React.useEffect(() => {
        dispatch(fetchStaticAddresses());
        return () => {
            dispatch(clearDeliveryModalStore());
        };
    }, []);

    return (
        <ModalContainer paramsUpdater={() => deleteParam("delivery-method")}>
            <ModalBody>
                <ModalHeader {...{ title, closeHandler: () => deleteParam("delivery-method") }} />
                {/* {loading ? <Spinner /> : <Tabs />} */}
            </ModalBody>
        </ModalContainer>
    );
};

export default DeliveryModal;