import { createBrowserRouter } from "react-router-dom";
import { baseLayout } from "./layout/baseLayout";
import { pages } from "@/pages";
import { ViewWithSuspense as NotFound } from "@/pages/NotFound";
import { AuthPage } from "@/pages/Auth";

export const appRouter = createBrowserRouter([
    {
        element: baseLayout,
        errorElement: (
            <NotFound title='Что-то пошло не так' description='Пожалуйста, попробуйте обновить страницу' reloadButton />
        ),
        children: pages,
    },
    AuthPage,
]);