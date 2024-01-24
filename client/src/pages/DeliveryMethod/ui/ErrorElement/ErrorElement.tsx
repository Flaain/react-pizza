import React from "react";
import ModalContainer from "@/shared/ui/ModalContainer/ui";
import BodySkeleton from "../Skeletons/BodySkeleton";
import { useNavigate, useRouteError } from "react-router-dom";
import { LazyErrorElement } from "../../model/lazy";

const ErrorElement = () => {
    const navigate = useNavigate();

    const error = useRouteError();

    return (
        <ModalContainer closeHandler={() => navigate('/cart')}>
            <React.Suspense fallback={<BodySkeleton />}>
                <LazyErrorElement error={error} navigate={navigate} />
            </React.Suspense>
        </ModalContainer>
    );
};

export default ErrorElement;