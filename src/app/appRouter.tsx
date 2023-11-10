import { createBrowserRouter } from "react-router-dom";
import { baseLayout } from "./layout/baseLayout";
import { pages } from "@/pages";
import { ViewWithSuspense as NotFound } from "@/pages/NotFound";

export const appRouter = createBrowserRouter([
    {
        element: baseLayout,
        errorElement: (
            <NotFound
                title='Что-то пошло не так'
                description='Пожалуйста, попробуйте обновить страницу'
                reloadButton
                reloadButtonText='Обновить страницу'
            />
        ),
        children: pages,
    },
]);