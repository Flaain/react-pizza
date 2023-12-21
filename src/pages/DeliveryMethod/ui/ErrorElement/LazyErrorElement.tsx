import ModalBody from "@/shared/ui/ModalBody/ui";
import ModalHeader from "@/shared/ui/ModalHeader/ui";
import React from "react";
import { LazyErrorElementProps } from "../../model/interfaces";

const LazyErrorElement: React.FC<LazyErrorElementProps> = ({ error, navigate }) => {
    return (
        <ModalBody>
            <ModalHeader title='Ошибка' closeHandler={() => navigate("/cart")} />
            <code>{JSON.stringify(error, null, 2)}</code>
        </ModalBody>
    );
};

export default LazyErrorElement;