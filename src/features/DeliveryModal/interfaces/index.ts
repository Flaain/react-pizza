export interface Props {
    title: string;
}

export interface Address {
    address: string;
    rating?: number;
    deliveryPrice?: number;
}

export interface DeliveryMethod {
    name: string;
    addresses: Array<Address>;
    isEditable?: boolean;
    isAddable?: boolean;
}

export interface initialState {
    loading: boolean;
    deliveryMethods: Array<DeliveryMethod>;
    error: unknown;
    tabIndex: number;
}