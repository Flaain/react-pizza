import Container from "@/shared/ui/Container";
import Logo from "./Logo";
import Search from "@/features/Search/ui";
import ProfileMenu from "@/features/ProfileMenu/ui/ui";
import { useAppSelector } from "@/shared/model/store";
import { userSelector } from "@/shared/model/selectors";
import { Link } from "react-router-dom";
import { CartPreview } from "@/features/CartPreview";
import { routerList } from "@/shared/config/constants";

export const LayoutHeader = () => {
    const { isAuthenticated, isAuthInProgress } = useAppSelector(userSelector);

    return (
        <header className='py-[25px] box-border sticky bg-white left-0 right-0 top-0 z-[100]'>
            <Container classNames='max-w-[1320px] w-full my-0 mx-auto px-[15px] box-border flex max-sm:flex-col items-center justify-between gap-5'>
                <Logo title='React Pizza' description='самая вкусная пицца во вселенной' />
                <Search />
                <div className='flex items-center gap-5 max-sm:w-full max-sm:justify-between'>
                    {!isAuthInProgress &&
                        (isAuthenticated ? (
                            <ProfileMenu />
                        ) : (
                            <Link
                                to={routerList.AUTH}
                                className='text-primary-black border-b border-dashed hover:text-primary-orange hover:border-primary-orange'
                            >
                                войти
                            </Link>
                        ))}
                    <CartPreview />
                </div>
            </Container>
        </header>
    );
};