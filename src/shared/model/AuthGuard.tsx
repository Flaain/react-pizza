import { Navigate } from "react-router-dom";
import { AuthGuardProps } from "./interfaces";
import { useAppSelector } from "./store";
import { userSelector } from "./selectors";

export const AuthGuard = ({ children }: AuthGuardProps) => {
    const { jwt } = useAppSelector(userSelector);

    return jwt ? <Navigate to='/' replace /> : children;
};