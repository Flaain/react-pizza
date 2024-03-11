import { InfoListProps } from "../../model/interfaces";
import InfoItem from "../InfoItem";

const InfoList = ({ items }: InfoListProps) => {
    return (
        <ul className='flex flex-col w-full items-start justify-start gap-5'>
            {items.map(({ title, description }, index) => (
                <InfoItem key={index} title={title} description={description} />
            ))}
        </ul>
    );
};

export default InfoList;