import { AvaiblePaymentMenus } from "../../../app/context/types";

export interface Props {
    closeHandler: () => void;
}

export type Menus = {
    [name in AvaiblePaymentMenus]: { component: JSX.Element, title: string };
};