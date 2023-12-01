import { Navigate } from "react-router-dom";
import { AuthGuardProps } from "./interfaces";

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const isAuthorized = null;

    return isAuthorized ? <Navigate to='/' replace /> : children;
};