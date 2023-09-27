import Logo from "./Logo";
import Container from "../../../shared/ui/Container";
import CartPreview from "../../CartPreview/ui";
import Search from "../../../features/Search/ui";
import { useLocation } from "react-router-dom";

const Header = () => {
    const { pathname } = useLocation();
    return (
        <header className='py-[25px] box-border'>
            <Container classNames='max-w-[1320px] w-full my-0 mx-auto px-[15px] box-border flex items-center justify-between'>
                <Logo title='React Pizza' description='самая вкусная пицца во вселенной' />
                {pathname === "/" && <Search />}
                <CartPreview />
            </Container>
        </header>
    );
};

export default Header;