import Container from "@/shared/ui/Container";
import Logo from "../Logo";

export const LayoutHeader = () => {
    return (
        <header className='py-[25px] box-border'>
            <Container classNames='max-w-[1320px] w-full my-0 mx-auto px-[15px] box-border flex max-sm:flex-col items-center justify-between gap-5'>
                <Logo title='React Pizza' description='самая вкусная пицца во вселенной' />
                {/* <Search />
                <CartPreview /> */}
            </Container>
        </header>
    );
};