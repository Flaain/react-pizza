import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import Typography from "@/shared/ui/Typography/ui/ui";
import { CallToActionBlockProps } from "../model/interfaces";

const CallToActionBlock = ({ title, action, reason, reasonText, component, as }: CallToActionBlockProps) => {
    const Component = as ?? "div";
    
    return (
        <Component className='flex flex-col col-span-full items-start self-start mr-10 mb-10 py-5 px-10 rounded-xl box-border bg-white shadow-lg border border-solid border-primary-gray'>
            {action ? (
                <button className='flex items-center outline-none justify-between w-full mb-5 group' onClick={action}>
                    <Typography className='text-2xl font-bold text-primary-black group-hover:text-primary-orange'>
                        {title}
                    </Typography>
                    <img src={getImageUrl("pen.svg")} alt='edit info' />
                </button>
            ) : (
                <Typography className='mb-5 text-2xl text-primary-black font-bold'>{title}</Typography>
            )}
            {reason ? <Typography as="p" variant='description'>{reasonText}</Typography> : component}
        </Component>
    );
};

export default CallToActionBlock;