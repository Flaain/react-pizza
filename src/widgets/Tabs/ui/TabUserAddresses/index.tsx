import React from "react";
import cn from "@/shared/lib/classNames";
import TabContentList from "../TabContentList";
import { TabContentProps } from "../../model/interfaces";

const TabUserAddresses: React.FC<TabContentProps> = ({ activeTab, currentInfo, isSaveBtnDisabled, handleChange, handleSave }) => {
    const { 0: showAddForm, 1: setShowAddForm } = React.useState(false);

    if (showAddForm) {
        return (
            <>
                <p>форма добавления адреса</p>
                <button onClick={() => setShowAddForm(false)} className='mt-auto'>
                    отмена
                </button>
            </>
        );
    }

    return !activeTab.addresses.length ? (
        <>
            <p className='text-gray-400'>Нет сохранненых адресов</p>
            <button
                onClick={() => setShowAddForm(true)}
                className='flex items-center justify-center self-start py-2 px-5 rounded-lg bg-primary-orange text-white mt-auto'
            >
                Добавить адрес доставки
            </button>
        </>
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