import React from "react";
import cn from "@/shared/lib/classNames";
import TabContentList from "../TabContentList";
import { TabContentProps } from "../../model/interfaces";
import { useNavigate } from "react-router-dom";
import FormUserAddress from "@/widgets/FormUserAddress/ui/ui";
import EmptyUserAddresses from "./EmptyUserAddresses";

const TabUserAddresses: React.FC<TabContentProps> = ({ activeTab, currentInfo, isSaveBtnDisabled, handleChange, handleSave }) => {
    const [showAddForm, setShowAddForm] = React.useState(false);

    const navigate = useNavigate();

    if (showAddForm) {
        return <FormUserAddress setShowAddForm={setShowAddForm} />;
    }

    return !activeTab.addresses.length ? (
        <EmptyUserAddresses navigate={navigate} setShowAddForm={setShowAddForm} />
    ) : (
        <>
            <TabContentList activeTab={activeTab} currentInfo={currentInfo} handleChange={handleChange} />
            <div className='self-start mt-auto flex items-center gap-5'>
                <button
                    onClick={handleSave}
                    disabled={isSaveBtnDisabled}
                    className={cn(
                        "flex items-center justify-center py-2 px-5 rounded-lg bg-primary-orange text-white",
                        (!currentInfo || !activeTab.addresses.length || isSaveBtnDisabled) &&
                            "opacity-50 cursor-default"
                    )}
                >
                    Сохранить
                </button>
                <button className='bg-primary-orange/10 py-2 px-5 rounded-lg text-primary-orange hover:bg-primary-orange/20 transition-colors duration-200 ease-in-out'>
                    Отмена
                </button>
            </div>
        </>
    );
};

export default TabUserAddresses;