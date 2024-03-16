import cn from "@/shared/lib/classNames";
import { logout } from "@/app/redux/slice/user.slice";
import { clearCart } from "@/pages/Cart";
import { useDispatch } from "react-redux";
import { LogoutBtnProps } from "../model/interfaces";

const LogoutBtn = ({ onLogout, title = "выйти", className, ...rest }: LogoutBtnProps) => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearCart());
        onLogout?.();
    };

    return (
        <button
            {...rest}
            onClick={handleLogout}
            className={cn(
                "text-primary-black border-b border-dashed hover:text-primary-orange hover:border-primary-orange",
                !!className && className
            )}
        >
            {title}
        </button>
    );
};

export default LogoutBtn;