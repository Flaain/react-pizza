import React from "react";
import ModalBody from "@/shared/ui/ModalBody/ui";
import ModalHeader from "@/shared/ui/ModalHeader/ui";
import TabsTriggerSkeleton from "@/shared/ui/Tabs/ui/Skeleton/TabsTriggerSkeleton";
import MethodTabs from "../MethodTabs";
import { Await, useLoaderData } from "react-router-dom";
import { IApiData, IStaticAddress } from "@/shared/model/interfaces";
import { DeliveryMethodModalContentProps } from "../../model/interfaces";

const DeliveryMethodModalContent = ({ title, navigate }: DeliveryMethodModalContentProps) => {
    const data = useLoaderData() as Promise<IApiData<Array<IStaticAddress>>>;

    return (
        <ModalBody>
            <ModalHeader title={title} closeHandler={() => navigate("/cart")} />
            <React.Suspense fallback={<TabsTriggerSkeleton />}>
                <Await resolve={data}>
                    <MethodTabs />
                </Await>
            </React.Suspense>
        </ModalBody>
    );
};

export default DeliveryMethodModalContent;