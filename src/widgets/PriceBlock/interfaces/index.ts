import { SetURLSearchParams } from "react-router-dom";
import { Pizza } from "../../../shared/api/interfaces";

export interface Props {
    activeItem: Pizza;
    detailsPageParams: URLSearchParams;
    setDetailsPageParams: SetURLSearchParams;
}