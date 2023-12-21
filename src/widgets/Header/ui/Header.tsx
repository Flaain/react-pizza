import Logo from "./Logo";
import Container from "@/shared/ui/Container";
import CartPreview from "../../CartPreview/ui";
import Search from "@/features/Search/ui";

const Header = () => {
    return (
        <header className='py-[25px] box-border'>
            <Container classNames='max-w-[1320px] w-full my-0 mx-auto px-[15px] box-border flex max-sm:flex-col items-center justify-between gap-5'>
                <Logo title='React Pizza' description='самая вкусная пицца во вселенной' />
                <Search />
                <CartPreview />
            </Container>
        </header>
    );
};

export default Header;