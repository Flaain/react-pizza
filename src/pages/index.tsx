import BaseLayout from "../app/layouts/ui/BaseLayout";
import PizzaDetails from "./PizzaDetails/ui";
import NotFound from "./NotFound/ui";
import Home from "./Home/ui";
import Cart from "./Cart/ui";
import { Routes, Route } from "react-router-dom";

const Routing = () => {
    return (
        <>
            <Routes>
                <Route element={<BaseLayout />}>
                    <Route path='/' element={<Home />} />
                    <Route path='cart' element={<Cart />} />
                    <Route path='pizza/:name' element={<PizzaDetails />} />
                    <Route path='*' element={<NotFound title='Страница не найдена' backLink />} />
                </Route>
            </Routes>
        </>
    );
};

export default Routing;