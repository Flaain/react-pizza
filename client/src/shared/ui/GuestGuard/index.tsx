import Spinner from "../Spinner/ui";
import Container from "../Container";
import { useAppSelector } from "@/shared/model/store";
import { GuestGuardProps } from "../../model/interfaces";
import { Navigate } from "react-router-dom";
import { userSelector } from "@/shared/model/selectors";
import { routerList } from "@/shared/config/constants";

export const GuestGuard = ({ children }: GuestGuardProps) => {
    const { isAuthInProgress, isAuthenticated } = useAppSelector(userSelector);

    if (isAuthInProgress) {
        return (
            <Container classNames='min-h-[calc(100vh-102px)]'>
                <Spinner position='center' />
            </Container>
        );
    }

    return isAuthenticated ? children : <Navigate to={routerList.AUTH} replace />;
};