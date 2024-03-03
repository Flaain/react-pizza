import { AuthGuardProps } from "../../model/interfaces";
import { userSelector } from "../../model/selectors";
import { useAppSelector } from "../../model/store";
import { Navigate } from "react-router-dom";
import Spinner from "../Spinner/ui";

export const AuthGuard = ({ children }: AuthGuardProps) => {
    const { jwt, isAuthInProgress } = useAppSelector(userSelector);

    if (isAuthInProgress) return <Spinner position='center' />;

    return jwt ? <Navigate to='/' replace /> : children;
};