import { AuthGuardProps } from "../../model/interfaces";
import { userSelector } from "../../model/selectors";
import { useAppSelector } from "../../model/store";
import { Navigate } from "react-router-dom";
import Spinner from "../Spinner/ui";

export const AuthGuard = ({ children }: AuthGuardProps) => {
    const { isAuthInProgress, isAuthenticated } = useAppSelector(userSelector);

    if (isAuthInProgress) return <Spinner position='center' />;

    return isAuthenticated ? <Navigate to='/' replace /> : children;
};