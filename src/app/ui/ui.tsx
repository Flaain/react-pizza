import { ViewWithSuspense as NotFound } from "@/pages/NotFound";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "../model/appRouter";
import { appSelector } from "@/shared/model/selectors";
import { useAppSelector } from "@/shared/model/store";

const App = () => {
    const { error } = useAppSelector(appSelector);

    return error ? (
        <NotFound
            title='Не удалось получить данные с сервера'
            description='Пожалуйста, проверьте свое соединение с интернетом и обновите страницу'
            reloadButton
            screen
            error={error}
        />
    ) : (
        <RouterProvider router={appRouter} />
    );
};

export default App;