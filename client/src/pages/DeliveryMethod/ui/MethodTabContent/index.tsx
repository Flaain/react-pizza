import MethodControls from "../MethodControls";
import MethodList from "../MethodList";
import React from "react";
import { DeliveryMethodType, MethodTabContentProps } from "../../model/interfaces";
import { useNavigate } from "react-router-dom";
import { routerList } from "@/shared/config/constants";
import FormUserAddress from "@/widgets/FormUserAddress/ui/ui";
import { useAppSelector } from "@/shared/model/store";
import { userSelector } from "@/shared/model/selectors";

const emptyComponents: Record<DeliveryMethodType, React.ReactNode> = {
    pickup: <p>Не удалось загрузить пункты самовывоза</p>,
    delivery: <p className='text-gray-400'>Нет сохранненых адресов</p>,
};

const MethodTabContent = ({ addresses, currentInfo, handleAddressChange, handleSave, method, isSaveBtnDisabled }: MethodTabContentProps) => {
    const { isAuthenticated } = useAppSelector(userSelector);

    const [showForm, setShowForm] = React.useState(false);
    
    const navigate = useNavigate();

    React.useEffect(() => { setShowForm(false) }, [method])

    const onShowForm = () => isAuthenticated ? setShowForm(true) : navigate(routerList.AUTH);

    if (showForm) return <FormUserAddress setShowAddForm={setShowForm} />;

    return (
        <>
            {!addresses.length ? (
                emptyComponents[method]
            ) : (
                <MethodList
                    addresses={addresses}
                    currentInfo={currentInfo}
                    handleAddressChange={handleAddressChange}
                    method={method}
                />
            )}
            <MethodControls
                method={method}
                hasAddresses={!!addresses.length}
                onSave={handleSave}
                onCancel={() => navigate(routerList.CART.main)}
                onShowForm={onShowForm}
                isSaveBtnDisabled={isSaveBtnDisabled}
            />
        </>
    );
};

export default MethodTabContent;