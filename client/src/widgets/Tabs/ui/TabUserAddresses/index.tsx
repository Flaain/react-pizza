import React from "react";
import cn from "@/shared/lib/classNames";
import TabContentList from "../TabContentList";
import FormUserAddress from "@/widgets/FormUserAddress/ui/ui";
import EmptyUserAddresses from "./EmptyUserAddresses";
import { TabContentProps } from "../../model/interfaces";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/shared/model/store";
import { userSelector } from "@/shared/model/selectors";
import isSaveDisabled from "../../lib/isSaveDisabled";
import { routerList } from "@/shared/config/constants";

const TabUserAddresses = ({ currentInfo, setCurrentInfo, method, handleChange, handleSave }: TabContentProps) => {
    const { deliveryInfo, addresses } = useAppSelector(userSelector);
    const { isAuthenticated } = useAppSelector(userSelector);

    const [showAddForm, setShowAddForm] = React.useState(false);

    const isSaveBtnDisabled = isSaveDisabled(method, currentInfo, deliveryInfo);

    const addressesArr = React.useMemo(() => [...addresses.values()], [addresses]);

    const navigate = useNavigate();

    if (showAddForm) {
        return isAuthenticated ? (
            <FormUserAddress setShowAddForm={setShowAddForm} setCurrentInfo={setCurrentInfo} />
        ) : (
            <Navigate to={routerList.AUTH} replace />
        );
    }

    return !addressesArr.length ? (
        <EmptyUserAddresses navigate={navigate} setShowAddForm={setShowAddForm} />
    ) : (
        <>
            <TabContentList
                elements={addressesArr}
                method={method}
                currentInfo={currentInfo}
                handleChange={handleChange}
            />
            <div className='self-start mt-auto flex items-center gap-5'>
                <button
                    onClick={handleSave}
                    disabled={isSaveBtnDisabled}
                    className={cn(
                        "flex items-center justify-center py-2 px-5 rounded-lg bg-primary-orange text-white",
                        isSaveBtnDisabled && "opacity-50 cursor-default"
                    )}
                >
                    Сохранить
                </button>
                <button
                    onClick={() => setShowAddForm(true)}
                    className='flex items-center justify-center self-start py-2 px-5 rounded-lg bg-transparent text-primary-orange mt-auto'
                >
                    Добавить адрес доставки
                </button>
            </div>
        </>
    );
};

export default TabUserAddresses;