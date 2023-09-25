import React from "react";
import HeaderLayout from "../HeaderLayout";
import { Outlet } from "react-router-dom";

const BaseLayout = () => {
    return (
        <>
            <HeaderLayout />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default BaseLayout;