import React from "react";
import ModalContainer from "@/shared/ui/ModalContainer/ui";
import TabsSkeleton from "@/shared/ui/Tabs/ui/Skeletons/TabsTriggerSkeleton";
import ModalBody from "@/shared/ui/ModalBody/ui";
import ModalHeader from "@/shared/ui/ModalHeader/ui";

import { DeliveryMethodProps } from "../model/interfaces";
import { useNavigate } from "react-router-dom";
import { DeliveryMethodContent } from "../model/lazy";

const DeliveryMethod = ({ title }: DeliveryMethodProps) => {
    const navigate = useNavigate();

    return (
        <ModalContainer closeHandler={() => navigate("/cart")}>
            <ModalBody>
                <ModalHeader title={title} closeHandler={() => navigate("/cart")} />
                <React.Suspense fallback={<TabsSkeleton />}>
                    <DeliveryMethodContent />
                </React.Suspense>
            </ModalBody>
        </ModalContainer>
    );
};

export default DeliveryMethod;