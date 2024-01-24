import { Navigate } from "react-router-dom";
import { GuestGuardProps } from "./interfaces";

export const GuestGuard = ({ children }: GuestGuardProps) => {
    const isAuthorized = null;

    return isAuthorized ? children : <Navigate to='/login' replace />;
};