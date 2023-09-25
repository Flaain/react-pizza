import { Pizza } from "../../../shared/api/interfaces";

export interface Props {
    data: Pizza[];
    loading?: boolean;
}