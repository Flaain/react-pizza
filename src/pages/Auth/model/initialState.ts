import { localStorageKeys } from "@/shared/config/constants";
import { UserSliceState } from "./interfaces";

export const userInitialState: UserSliceState = {
    jwt: localStorage.getItem(localStorageKeys.JWT),
};