import React from "react";
import ModalBody from "@/shared/ui/ModalBody/ui";
import ModalHeader from "@/shared/ui/ModalHeader/ui";
import { Tabs, TabsSkeleton } from "@/widgets/Tabs";
import { Await, useLoaderData } from "react-router-dom";
import { Address, Data } from "@/shared/model/interfaces";
import { DeliveryMethodModalContentProps } from "../../model/interfaces";

const DeliveryMethodModalContent = ({ title, navigate }: DeliveryMethodModalContentProps) => {
    const { data } = useLoaderData() as { data: Promise<Data<Array<Address>>> };

    return (
        <ModalBody>
            <ModalHeader title={title} closeHandler={() => navigate("/cart")} />
            <React.Suspense fallback={<TabsSkeleton />}>
                <Await resolve={data}>
                    <Tabs />
                </Await>
            </React.Suspense>
        </ModalBody>
    );
};

export default DeliveryMethodModalContent;