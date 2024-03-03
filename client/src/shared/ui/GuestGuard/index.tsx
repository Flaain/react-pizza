import { useAppSelector } from "@/shared/model/store";
import { GuestGuardProps } from "../../model/interfaces";
import { Navigate } from "react-router-dom";
import { userSelector } from "@/shared/model/selectors";
import { routerList } from "@/shared/config/constants";
import Spinner from "../Spinner/ui";

export const GuestGuard = ({ children }: GuestGuardProps) => {
    const { jwt, isAuthInProgress } = useAppSelector(userSelector);

    if (isAuthInProgress) return <Spinner position='center' />;

    return jwt ? children : <Navigate to={routerList.AUTH} replace />;
};