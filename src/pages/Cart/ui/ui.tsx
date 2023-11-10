import React from "react";
import Container from "@/shared/ui/Container";
import CartItemsList from "@/widgets/CartItemsList";
import EmptyCart from "./CartEmpty";
import cn from "@/shared/lib/classNames";
import MinimizeCartInfo from "@/features/MinimizeCartInfo/ui";
import OrderInfo from "@/features/OrderInfo/ui";
import PaymentInfoModal from "@/entities/PaymentInfoModal/ui";
import MinimizeCartItemsButton from "@/features/MinimizeCartItemsButton/ui";
import InfoCartContainer from "@/widgets/InfoCartContainer/ui";

import { AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux";
import { rootSelector } from "@/app/redux";
import { clearCart, clearOrder } from "../store/slice";
import { fetchPromocodes, handleOrder } from "../store/asyncActions";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { Outlet, useSearchParams } from "react-router-dom";
import { cartSelector } from "../store/selectors";

const Cart = () => {
    const {
        cart,
        orderLoading,
        order,
        ordered,
        deliveryInfo,
        priceView: { total, totalItems },
    } = useSelector(cartSelector);
    const { pizzas } = useSelector(rootSelector);

    const [searchParams, setSearchParams] = useSearchParams();
    const [minimizeCartItems, setMinimizeCartItems] = React.useState(false);
    const [paymentInfoModalOpened, setPaymentInfoModalOpened] = React.useState(false);

    const isMinimizable = React.useMemo(() => cart.reduce((acc, { items }) => (acc += items.length), 0) > 1, [cart]);

    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();

    React.useEffect(() => {
        dispatch(fetchPromocodes());

        return () => {
            dispatch(clearOrder());
        };
    }, []);

    if (!cart.length && !ordered) return <EmptyCart />;

    return (
        <section>
            <Container classNames='grid grid-cols-7 max-w-[1320px] w-full my-0 mx-auto px-[15px] box-border py-5'>
                <Outlet />
                {/* <AnimatePresence>
                    {paymentInfoModalOpened && (<PaymentInfoModal key='paymentModal' closeHandler={() => setPaymentInfoModalOpened(false)} />)}
                </AnimatePresence>
                <div className='col-span-5'>
                    <div
                        className={cn(
                            "flex flex-col self-start mr-10 mb-10 pb-5 justify-between px-10 rounded-xl bg-white shadow-lg border border-solid border-primary-gray",
                            minimizeCartItems && "max-h-[120px]"
                        )}
                    >
                        <div className='flex items-center justify-between sticky top-0 bg-white z-10 py-5'>
                            <h1 className='text-2xl font-bold text-primary-black'>
                                Корзина <sup className='text-lg'>{totalItems}</sup>
                            </h1>
                            <div className='flex items-center gap-5'>
                                <button
                                    disabled={orderLoading}
                                    onClick={() => dispatch(clearCart)}
                                    className='text-primary-black border-b border-dashed hover:text-primary-orange hover:border-primary-orange'
                                >
                                    Очистить корзину
                                </button>
                                {isMinimizable && <MinimizeCartItemsButton />}
                            </div>
                        </div>
                        {minimizeCartItems ? <MinimizeCartInfo /> : <CartItemsList cart={cart} />}
                    </div>
                    <InfoCartContainer />
                </div>
                <OrderInfo
                    handleOrder={() => deliveryInfo && dispatch(handleOrder({ cart, deliveryInfo, pizzas, total }))}
                    setPaymentInfoModalOpened={setPaymentInfoModalOpened}
                /> */}
            </Container>
        </section>
    );
};

export default Cart;