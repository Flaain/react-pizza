import React from "react";
import Logo from "./Logo";
import Container from "../../../shared/ui/Container";
import CartPreview from "../../CartPreview/ui";

const Header = () => {
    return (
        <header className='py-[25px] box-border'>
            <Container classNames='max-w-[1320px] w-full my-0 mx-auto px-[15px] box-border flex items-center justify-between'>
                <Logo />
                <CartPreview />
            </Container>
        </header>
    );
};

export default Header;