import { routerList } from "@/shared/config/constants";
import { userSelector } from "@/shared/model/selectors";
import { useAppSelector } from "@/shared/model/store";
import { Link } from "react-router-dom";

const ProfileMenuHeader = () => {
    const { name, email } = useAppSelector(userSelector);

    return (
        <li className='group'>
            <Link to={routerList.LK.main} className='flex items-center gap-3'>
                <span className='w-[50px] h-[50px] flex justify-center items-center rounded-full bg-primary-gray text-2xl font-bold text-primary-black group-hover:text-primary-orange transition-colors duration-200 ease-in-out'>
                    {name![0]}
                </span>
                <div className='flex flex-col'>
                    <span className='text-primary-black font-medium max-w-[200px] truncate group-hover:text-primary-orange transition-colors duration-200 ease-in-out'>
                        {name}
                    </span>
                    <p className='text-primary-black opacity-50 max-w-[200px] truncate'>{email}</p>
                </div>
            </Link>
        </li>
    );
};

export default ProfileMenuHeader;