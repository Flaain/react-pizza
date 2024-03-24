import { ModalBody, ModalContainer, ModalHeader } from "..";
import { ModalProps } from "../model/interfaces";

const Modal = ({ closeHandler, title, children }: ModalProps) => {
    return (
        <ModalContainer closeHandler={closeHandler}>
            <ModalBody>
                <ModalHeader title={title} closeHandler={closeHandler} />
                {children}
            </ModalBody>
        </ModalContainer>
    );
};

export default Modal;
