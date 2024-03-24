import React from "react";
import MethodTabs from "../MethodTabs";
import TabsSkeleton from "@/shared/ui/Tabs/ui/Skeletons/TabsTriggerSkeleton";
import { Await, useLoaderData } from "react-router-dom";
import { Address, IApiData } from "@/shared/model/interfaces";

const DeliveryMethodModalContent = () => {
    const { addresses } = useLoaderData() as { addresses: Promise<IApiData<Array<Address>>> };

    return (
        <React.Suspense fallback={<TabsSkeleton />}>
            <Await resolve={addresses}>
                <MethodTabs />
            </Await>
        </React.Suspense>
    );
};

export default DeliveryMethodModalContent;