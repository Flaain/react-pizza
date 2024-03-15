import ModalContainer from "@/shared/ui/ModalContainer/ui";
import TabsSkeleton from "@/shared/ui/Tabs/ui/Skeletons/TabsTriggerSkeleton";
import ModalBody from "@/shared/ui/ModalBody/ui";
import { useNavigate } from "react-router-dom";

const ErrorElement = () => {
    const navigate = useNavigate();

    return (
        <ModalContainer closeHandler={() => navigate('/cart')}>
            <ModalBody>
                <TabsSkeleton />
            </ModalBody>
        </ModalContainer>
    );
};

export default ErrorElement