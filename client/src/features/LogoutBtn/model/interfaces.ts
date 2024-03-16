import React from "react";

export interface LogoutBtnProps extends React.HTMLAttributes<HTMLButtonElement> {
    onLogout?: () => void
    title?: string
}