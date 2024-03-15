import cn from "@/shared/lib/classNames";
import { MethodControlsProps } from "../../model/interfaces";

const MethodControls = ({
    method,
    onCancel,
    onSave,
    onShowForm,
    isSaveBtnDisabled,
    hasAddresses,
}: MethodControlsProps) => {
    return (
        <div className='self-start mt-auto flex items-center gap-5'>
            {hasAddresses && (
                <button
                    onClick={onSave}
                    disabled={isSaveBtnDisabled}
                    className={cn({
                        "flex items-center justify-center py-2 px-5 rounded-lg bg-primary-orange text-white": true,
                        "opacity-50 cursor-default": isSaveBtnDisabled,
                    })}
                >
                    Сохранить
                </button>
            )}
            {method === "delivery" && (
                <button
                    onClick={onShowForm}
                    className={cn({
                        "flex items-center justify-center self-start py-2 px-5 rounded-lg mt-auto": true,
                        "text-primary-orange bg-transparent order-1": hasAddresses,
                        "bg-primary-orange text-white": !hasAddresses,
                    })}
                >
                    Добавить адрес доставки
                </button>
            )}
            <button
                onClick={onCancel}
                className={cn({
                    "bg-primary-orange/10 py-2 px-5 rounded-lg text-primary-orange hover:bg-primary-orange/20 transition-colors duration-200 ease-in-out": true,
                    "min-w-[200px]": !hasAddresses && method === "pickup",
                })}
            >
                Отмена
            </button>
        </div>
    );
};

export default MethodControls;
