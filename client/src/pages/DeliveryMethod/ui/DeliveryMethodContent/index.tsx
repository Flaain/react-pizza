import React from "react";
import MethodTabs from "../MethodTabs";
import TabsSkeleton from "@/shared/ui/Tabs/ui/Skeletons/TabsTriggerSkeleton";
import { Await, useLoaderData } from "react-router-dom";
import { Address, IApiData } from "@/shared/model/interfaces";

const DeliveryMethodModalContent = () => {
    const data = useLoaderData() as Promise<IApiData<Array<Address>>>;

    return (
        <React.Suspense fallback={<TabsSkeleton />}>
            <Await resolve={data}>
                <MethodTabs />
            </Await>
        </React.Suspense>
    );
};

export default DeliveryMethodModalContent;