import cn from "@/shared/lib/classNames";
import TabContentList from "../TabContentList";
import isSaveDisabled from "../../lib/isSaveDisabled";
import { TabContentProps } from "../../model/interfaces";
import { useAsyncValue, useNavigate } from "react-router-dom";
import { IApiData, IStaicAddress } from "@/shared/model/interfaces";
import { useAppSelector } from "@/shared/model/store";
import { userSelector } from "@/shared/model/selectors";

const TabStaticAddresses = ({ method, currentInfo, handleChange, handleSave }: TabContentProps) => {
    const { data: addresses } = useAsyncValue() as IApiData<Array<IStaicAddress>>;
    const { deliveryInfo } = useAppSelector(userSelector);

    const isSaveBtnDisabled = isSaveDisabled(method, currentInfo, deliveryInfo);

    const navigate = useNavigate();

    return (
        <>
            {!addresses.length ? (
                <p className='text-gray-400'>Не удалось загрузить пункты самовывоза</p>
            ) : (
                <TabContentList
                    elements={addresses}
                    method={method}
                    currentInfo={currentInfo}
                    handleChange={handleChange}
                />
            )}
            <div className='self-start mt-auto flex items-center gap-5'>
                <button
                    disabled={isSaveBtnDisabled}
                    onClick={handleSave}
                    className={cn(
                        "flex items-center justify-center py-2 px-5 rounded-lg bg-primary-orange text-white",
                        isSaveBtnDisabled && "opacity-50 cursor-default"
                    )}
                >
                    Сохранить
                </button>
                <button
                    onClick={() => navigate("/cart")}
                    className='bg-primary-orange/10 py-2 px-5 rounded-lg text-primary-orange hover:bg-primary-orange/20 transition-colors duration-200 ease-in-out'
                >
                    Отмена
                </button>
            </div>
        </>
    );
};

export default TabStaticAddresses;