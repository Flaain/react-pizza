import React from "react";
import TabsSkeleton from "@/shared/ui/Tabs/ui/Skeletons/TabsTriggerSkeleton";

import { Modal } from "@/shared/ui/Modal";
import { DeliveryMethodProps } from "../model/interfaces";
import { useNavigate } from "react-router-dom";
import { DeliveryMethodContent } from "../model/lazy";
import { routerList } from "@/shared/config/constants";

const DeliveryMethod = ({ title }: DeliveryMethodProps) => {
    const navigate = useNavigate();

    return (
        <Modal closeHandler={() => navigate(routerList.CART.main)} title={title}>
            <React.Suspense fallback={<TabsSkeleton />}>
                <DeliveryMethodContent />
            </React.Suspense>
        </Modal>
    );
};

export default DeliveryMethod;