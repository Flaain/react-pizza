import React from "react";
import ModalBody from "@/shared/ui/ModalBody/ui";
import ModalHeader from "@/shared/ui/ModalHeader/ui";
import Tabs from "@/widgets/Tabs/ui/ui";
import TabsSkeleton from "../Skeletons/TabsSkeleton";
import { Await, useLoaderData } from "react-router-dom";
import { Data } from "@/shared/api/interfaces";
import { Address } from "@/shared/model/interfaces";
import { DeliveryMethodModalContentProps } from "../../model/interfaces";

const DeliveryMethodModalContent: React.FC<DeliveryMethodModalContentProps> = ({ title, navigate }) => {
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