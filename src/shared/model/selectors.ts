import { RootState } from "@/app/redux";

export const appSelector = ({ root }: RootState) => root;
export const cartSelector = ({ cart }: RootState) => cart;
export const userSelector = ({ user }: RootState) => user;