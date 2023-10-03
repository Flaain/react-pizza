import { Pizza } from "../../../shared/api/interfaces";

export interface Props {
    data: Pizza[];
    searchValue: string;
    loading?: boolean;
}