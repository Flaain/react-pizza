import { Product } from "../api/interfaces";

export interface PossibleParams {
    search: string;
    category: string;
    sort: string;
}

export interface Sort {
    id: number;
    name: string;
    sort: string;
    img?: string;
}

export interface GuestGuardProps {
    children: React.ReactElement;
}

export interface AuthGuardProps {
    children: React.ReactElement;
}
export interface EmptyCartGuardProps {
    children: React.ReactElement;
}

export interface Address {
    address: string;
    rating?: number;
    deliveryPrice?: number;
}

export interface ImageSkeletonProps {
    width: number;
    height: number;
}

export interface BrowserTitleProps {
    data: Product;
    children: React.ReactElement;
}