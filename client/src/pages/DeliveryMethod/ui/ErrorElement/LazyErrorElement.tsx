import ModalBody from "@/shared/ui/ModalBody/ui";
import ModalHeader from "@/shared/ui/ModalHeader/ui";
import { LazyErrorElementProps } from "../../model/interfaces";

const LazyErrorElement = ({ error, navigate }: LazyErrorElementProps) => {
    return (
        <ModalBody>
            <ModalHeader title='Ошибка' closeHandler={() => navigate("/cart")} />
            <code>{JSON.stringify(error, null, 2)}</code>
        </ModalBody>
    );
};

export default LazyErrorElement;