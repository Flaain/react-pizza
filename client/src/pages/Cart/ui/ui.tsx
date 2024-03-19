import React from "react";
import Container from "@/shared/ui/Container";
import cn from "@/shared/lib/classNames";
import CartItemsList from "./CartItemsList";
import Checkout from "@/features/Checkout/ui/ui";
import InfoContainer from "@/widgets/InfoContainer/ui/ui";
import PaymentModal from "@/widgets/PaymentModal/ui/ui";
import Spinner from "@/shared/ui/Spinner/ui";
import CartSkeleton from "./Skeletons/CartSkeleton";

import { MinimizeCartInfo, MinimizeButton } from "@/features/MinimizeCartInfo";
import { Navigate, Outlet } from "react-router-dom";
import { cartSelector, userSelector } from "@/shared/model/selectors";
import { useAppSelector } from "@/shared/model/store";
import { AnimatePresence } from "framer-motion";
import { EmptyCart } from "../model/lazy";
import { useCart } from "../lib/hooks/useCart";

const Cart = () => {
    const { priceView: { totalItems } } = useAppSelector(cartSelector);
    const { cartArr, isCartEmpty, isCartMinimized, setIsCartMinimized, cartLoading, handleClearCart } = useCart();
    const { isAuthInProgress } = useAppSelector(userSelector);
    
    const [paymentModalOpened, setPaymentModalOpened] = React.useState(false);

    if (isCartEmpty) {
        return (
            <React.Suspense
                fallback={
                    <Container classNames='max-w-[1320px] w-full my-0 mx-auto px-[15px] box-border flex flex-col items-center justify-center gap-10 h-[calc(100vh-132px)]'>
                        <Spinner position='center' />
                    </Container>
                }
            >
                <Navigate to='/cart' replace />
                <EmptyCart />
            </React.Suspense>
        );
    }

    if (cartLoading || isAuthInProgress) {
        return <CartSkeleton />
    }

    return (
        <section>
            <Container classNames='grid grid-cols-7 max-w-[1320px] w-full my-0 mx-auto px-[15px] box-border py-5'>
                <Outlet />
                <AnimatePresence>
                    {paymentModalOpened && <PaymentModal closeHandler={() => setPaymentModalOpened(false)} />}
                </AnimatePresence>
                <div className='col-span-5'>
                    <div
                        className={cn(
                            "flex flex-col self-start mr-10 mb-10 pb-5 justify-between px-10 rounded-xl bg-white shadow-lg border border-solid border-primary-gray",
                            isCartMinimized && "max-h-[120px]"
                        )}
                    >
                        <div className='flex items-center justify-between sticky top-0 bg-white z-10 py-5'>
                            <h1 className='text-2xl font-bold text-primary-black'>
                                Корзина <sup className='text-lg'>{totalItems}</sup>
                            </h1>
                            <div className='flex items-center gap-5'>
                                <button
                                    onClick={handleClearCart}
                                    className='text-primary-black border-b border-dashed hover:text-primary-orange hover:border-primary-orange'
                                >
                                    Очистить корзину
                                </button>
                                {cartArr.length > 1 && (
                                    <MinimizeButton
                                        title={isCartMinimized ? "показать товары" : "скрыть товары"}
                                        minimizeCartItems={isCartMinimized}
                                        onClick={() => setIsCartMinimized((prevState) => !prevState)}
                                    />
                                )}
                            </div>
                        </div>
                        {isCartMinimized ? <MinimizeCartInfo /> : <CartItemsList cart={cartArr} />}
                    </div>
                    <InfoContainer setPaymentModalOpened={setPaymentModalOpened} />
                </div>
                <Checkout setPaymentModalOpened={setPaymentModalOpened} />
            </Container>
        </section>
    );
};

export default Cart;