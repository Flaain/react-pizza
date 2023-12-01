import { Navigate } from "react-router-dom";
import { GuestGuardProps } from "./interfaces";

export const GuestGuard: React.FC<GuestGuardProps> = ({ children }) => {
    const isAuthorized = null;

    return isAuthorized ? children : <Navigate to='/login' replace />;
};