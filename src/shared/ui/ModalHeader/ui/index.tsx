import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import { Props } from "../model/interfaces";

const ModalHeader = ({ title, closeHandler }: Props) => {
    return (
        <div className='flex items-center justify-between w-full'>
            <h1 className='text-3xl text-primary-black font-bold'>{title}</h1>
            <button onClick={closeHandler}>
                <img src={getImageUrl("close.svg")} alt='close window' />
            </button>
        </div>
    );
};

export default ModalHeader;