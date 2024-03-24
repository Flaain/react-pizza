import Typography from "@/shared/ui/Typography/ui/ui";
import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import { ModalProps } from "../../model/interfaces";

const ModalHeader = ({ title, closeHandler }: Omit<ModalProps, "children">) => {
    return (
        <>
            {title ? (
                <div className='flex items-center justify-between w-full'>
                    <Typography size='3xl' weight='bold'>
                        {title}
                    </Typography>
                    <button onClick={closeHandler}>
                        <img src={getImageUrl("close.svg")} alt='close window' />
                    </button>
                </div>
            ) : (
                <button onClick={closeHandler} className='self-end'>
                    <img src={getImageUrl("close.svg")} alt='close window' />
                </button>
            )}
        </>
    );
};

export default ModalHeader;