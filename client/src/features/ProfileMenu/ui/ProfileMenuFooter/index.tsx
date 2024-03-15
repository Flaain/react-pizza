import { logout } from "@/app/redux/slice/user.slice";
import { clearCart } from "@/pages/Cart";
import { useDispatch } from "react-redux";

const ProfileMenuFooter = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearCart());
    };

    return (
        <li>
            <button
                onClick={handleLogout}
                className='text-primary-black border-b border-dashed hover:text-primary-orange hover:border-primary-orange'
            >
                выйти
            </button>
        </li>
    );
};

export default ProfileMenuFooter;