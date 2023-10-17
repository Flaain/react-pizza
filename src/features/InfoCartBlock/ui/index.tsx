import React from "react";
import getImageUrl from "../../../shared/lib/helpers/getImageUrl";
import { Props } from "../interfaces";

const InfoCartBlock: React.FC<Props> = ({ callToActionItem, callToActionReason, callToActionText, stateUpdater, paramsUpdater, disabled, title }) => {
    return (
        <div className='flex flex-col col-span-full items-start self-start mr-10 mb-10 py-5 px-10 rounded-xl box-border bg-white shadow-lg border border-solid border-primary-gray'>
            <button
                disabled={disabled}
                className='flex items-center outline-none justify-between w-full mb-5 group'
                onClick={() => stateUpdater ? stateUpdater(true) : paramsUpdater!()}
            >
                <span className='text-2xl font-bold text-primary-black group-hover:text-primary-orange'>{title}</span>
                <img src={getImageUrl("pen.svg")} alt='edit delivery info' />
            </button>
            {callToActionReason ? callToActionItem : <p className='text-gray-400'>{callToActionText}</p>}
        </div>
    );
};

export default InfoCartBlock;