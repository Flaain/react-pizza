import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import { routerList } from "@/shared/config/constants";
import { Link } from "react-router-dom";
import { logout } from "@/app/redux/slice/user.slice";
import { clearCart } from "@/pages/Cart";
import { useDispatch } from "react-redux";

const links: Record<string, { title: string; link: string; img?: string }> = {
    orders: {
        title: "Заказы",
        img: "bag.svg",
        link: routerList.LK.children.ORDERS,
    },
};

const ProfileMenuLinks = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearCart());
    };
    return (
        <ul className='flex flex-col gap-1'>
            {Object.values(links).map(({ title, img, link }) => (
                <li key={link}>
                    <Link
                        to={link}
                        className='flex items-center gap-2 p-2 rounded-lg hover:bg-primary-gray transition-colors duration-200 ease-in-out'
                    >
                        {img && <img src={getImageUrl(img)} width={24} height={24} />}
                        <span className='text-primary-black text-sm'>{title}</span>
                    </Link>
                </li>
            ))}
            <li>
                <button
                    onClick={handleLogout}
                    className='flex w-full items-center gap-2 text-primary-black text-sm p-2 rounded-lg hover:bg-primary-gray transition-colors duration-200 ease-in-out'
                >
                    <img src={getImageUrl("logout.svg")} width={24} height={24} />
                    Выйти
                </button>
            </li>
        </ul>
    );
};

export default ProfileMenuLinks;