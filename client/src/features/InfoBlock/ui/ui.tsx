import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import cn from "@/shared/lib/classNames";
import { Props } from "../model/interfaces";

const InfoBlock = ({ item, callToActionReason, callToActionText, updater, title }: Props) => {
    return (
        <div className='flex flex-col col-span-full items-start self-start mr-10 mb-10 py-5 px-10 rounded-xl box-border bg-white shadow-lg border border-solid border-primary-gray'>
            <button
                className={cn(
                    "flex items-center outline-none justify-between w-full mb-5 group",
                    !updater && "cursor-default"
                )}
                {...(updater && { onClick: updater })}
            >
                <span
                    className={cn(
                        "text-2xl font-bold text-primary-black",
                        updater! && "group-hover:text-primary-orange"
                    )}
                >
                    {title}
                </span>
                {updater && <img src={getImageUrl("pen.svg")} alt='edit info' />}
            </button>
            {callToActionReason ? item : <p className='text-gray-400'>{callToActionText}</p>}
        </div>
    );
};

export default InfoBlock;