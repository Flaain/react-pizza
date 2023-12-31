import React from "react";
import Routing from "../pages";
import NotFound from "../pages/NotFound/ui";
import parseJSON from "../shared/lib/helpers/parseJSON";
import saveToLocalStorage from "../shared/lib/helpers/saveToLocalStorage";
import Spinner from "../shared/ui/Spinner/ui";
import { api } from "../shared/api";
import { Pizza } from "../shared/api/interfaces";
import { AppContext } from "./context";
import { Cart } from "./context/interfaces";
import { CART_KEY } from "../shared/initialValues";
import { useSearchParams } from "react-router-dom";

const App = () => {
    const [pizzas, setPizzas] = React.useState<Array<Pizza>>([]);
    const [cart, setCart] = React.useState<Array<Cart>>(parseJSON(CART_KEY) ?? []);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchValue, setSearchValue] = React.useState(searchParams.get('query') ?? '');
    const [loading, setLoading] = React.useState<boolean>(true);
    const [errorData, setErrorData] = React.useState<Error | unknown>(null);

    React.useEffect(() => {
        (async () => {
            try {
                const { data } = await api.getPizzas();
                
                setPizzas(data);
            } catch (error) {
                console.error(error);
                setErrorData(error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    React.useEffect(() => saveToLocalStorage({ key: CART_KEY, data: JSON.stringify(cart) }), [cart]);

    if (errorData || (!loading && !pizzas.length)) {
        return (
            <NotFound
                title='Не удалось получить данные с сервера'
                description='Пожалуйста, проверьте свое соединение с интернетом и обновите страницу'
                reloadButton
                reloadButtonText='Обновить страницу'
                screen
                code={errorData}
            />
        );
    }

    return loading ? (
        <Spinner />
    ) : (
        <AppContext.Provider
            value={{
                loading,
                errorData,
                pizzas,
                setPizzas,
                cart,
                setCart,
                searchValue,
                setSearchValue,
                searchParams,
                setSearchParams,
            }}
        >
            <Routing />
        </AppContext.Provider>
    );
};

export default App;