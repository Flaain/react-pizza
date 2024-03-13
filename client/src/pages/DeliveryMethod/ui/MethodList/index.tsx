import MethodItem from "../MethodItem";
import { MethodListProps } from "../../model/interfaces";

const MethodList = ({ addresses, currentInfo, handleAddressChange }: MethodListProps) => {
    return (
        <ul className='flex flex-col gap-5 overflow-auto h-full mt-5'>
            {addresses.map((address) => (
                <MethodItem
                    address={address}
                    currentInfo={currentInfo}
                    handleAddressChange={handleAddressChange}
                    key={"id" in address ? address.id : address._id}
                />
            ))}
        </ul>
    );
};

export default MethodList;