import MethodItem from "../MethodItem";
import { MethodListProps } from "../../model/interfaces";

const MethodList = ({ addresses, currentInfo, method, handleAddressChange }: MethodListProps) => {
    return (
        <ul className='flex flex-col gap-5 overflow-auto h-full my-3'>
            {addresses.map((address) => (
                <MethodItem
                    key={address.id}
                    address={address}
                    currentInfo={currentInfo}
                    method={method}
                    handleAddressChange={handleAddressChange}
                />
            ))}
        </ul>
    );
};

export default MethodList;