import { userSelector } from "@/shared/model/selectors";
import { useAppSelector } from "@/shared/model/store";

const ProfileInfoList = () => {
    const { name, email } = useAppSelector(userSelector);
    return (
        <ul className='flex flex-col w-full items-start justify-start gap-5'>
            <li className='flex w-full items-start'>
                <span className='basis-[200px] text-gray-400'>Имя</span>
                <p className='font-medium w-[calc(100%-200px)]'>{name}</p>
            </li>
            <li className='flex w-full items-start'>
                <span className='basis-[200px] text-gray-400'>Почта</span>
                <p className='font-medium w-[calc(100%-200px)]'>{email}</p>
            </li>
        </ul>
    );
};

export default ProfileInfoList;