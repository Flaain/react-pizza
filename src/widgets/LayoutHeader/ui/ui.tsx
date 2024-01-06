import Container from "@/shared/ui/Container";
import Logo from "./Logo";
import CartPreview from "@/widgets/CartPreview/ui";
import Search from "@/features/Search/ui";
import { useAppSelector } from "@/shared/model/store";
import { userSelector } from "@/shared/model/selectors";
import { Link } from "react-router-dom";

export const LayoutHeader = () => {
    const { jwt } = useAppSelector(userSelector);

    return (
        <header className='py-[25px] box-border'>
            <Container classNames='max-w-[1320px] w-full my-0 mx-auto px-[15px] box-border flex max-sm:flex-col items-center justify-between gap-5'>
                <Logo title='React Pizza' description='самая вкусная пицца во вселенной' />
                <Search />
                <div className='flex items-center gap-5'>
                    {jwt ? <button className='text-primary-black border-b border-dashed hover:text-primary-orange hover:border-primary-orange'>выйти</button> : <Link to='/auth' className='text-primary-black border-b border-dashed hover:text-primary-orange hover:border-primary-orange'>войти</Link>}
                    <CartPreview />
                </div>
            </Container>
        </header>
    );
};