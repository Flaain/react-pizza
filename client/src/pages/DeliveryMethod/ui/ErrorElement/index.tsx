import TabsSkeleton from "@/shared/ui/Tabs/ui/Skeletons/TabsTriggerSkeleton";
import { Modal } from "@/shared/ui/Modal";
import { routerList } from "@/shared/config/constants";
import { useNavigate } from "react-router-dom";

const ErrorElement = () => {
    const navigate = useNavigate();

    return (
        <Modal closeHandler={() => navigate(routerList.CART.main)} title='Произошла ошибка'>
            <TabsSkeleton />
        </Modal>
    );
};

export default ErrorElement;