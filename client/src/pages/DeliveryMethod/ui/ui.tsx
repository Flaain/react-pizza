import React from "react";
import TabsSkeleton from "@/shared/ui/Tabs/ui/Skeletons/TabsTriggerSkeleton";

import { DeliveryMethodProps } from "../model/interfaces";
import { useNavigate } from "react-router-dom";
import { DeliveryMethodContent } from "../model/lazy";
import { ModalBody, ModalContainer, ModalHeader } from "@/shared/ui/Modal";

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