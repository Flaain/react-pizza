import React from "react";
import ModalContainer from "@/shared/ui/ModalContainer/ui";
import BodySkeleton from "./Skeletons/BodySkeleton";

import { Props } from "../model/interfaces";
import { useNavigate } from "react-router-dom";
import { DeliveryMethodContent } from "../model/lazy";

const DeliveryMethod = ({ title }: Props) => {
    const navigate = useNavigate();

    return (
        <ModalContainer closeHandler={() => navigate("/cart")}>
            <React.Suspense fallback={<BodySkeleton />}>
                <DeliveryMethodContent title={title} navigate={navigate} />
            </React.Suspense>
        </ModalContainer>
    );
};

export default DeliveryMethod;