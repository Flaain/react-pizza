import { Props } from "../model/interfaces";

const SliderTab: React.FC<Props> = ({ tabLeft, tabWidth }) => {
    return (
        <span
            className='absolute bottom-0 top-0 -z-10 flex transition-all duration-300 py-1'
            {...(tabWidth && tabLeft && { style: { left: tabLeft, width: tabWidth } })}
        >
            <span className='h-full w-full rounded-lg bg-white shadow-md box-border' />
        </span>
    );
};

export default SliderTab;