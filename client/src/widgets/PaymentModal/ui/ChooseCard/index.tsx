import cn from "@/shared/lib/classNames";
import { userSelector } from "@/shared/model/selectors";
import { useAppSelector } from "@/shared/model/store";
import { ChooseCardProps } from "../../model/interfaces";

const ChooseCard = ({ currentInfo, closeHandler, handleSave, setCurrentInfo }: ChooseCardProps) => {
    const { paymentInfo, cards } = useAppSelector(userSelector);

    const isSaveBtnDisabled = !currentInfo || currentInfo.card?.address === paymentInfo?.card?.address || currentInfo.method !== "card";
    const cardsArr = [...cards.values()];

    return (
        <>
            {cardsArr.length ? <p>тут будет список карт</p> : <p className='text-gray-400'>Нет сохранненых карт</p>}
            <div className='flex items-center gap-5 mt-auto'>
                <button
                    onClick={handleSave}
                    disabled={isSaveBtnDisabled}
                    className={cn(
                        "flex items-center justify-center py-2 px-5 rounded-lg bg-primary-orange text-white",
                        isSaveBtnDisabled && "opacity-50"
                    )}
                >
                    Сохранить
                </button>
                <button
                    onClick={closeHandler}
                    className='bg-primary-orange/10 py-2 px-5 rounded-lg text-primary-orange hover:bg-primary-orange/20 transition-colors duration-200 ease-in-out'
                >
                    Отмена
                </button>
            </div>
        </>
    );
};

export default ChooseCard;