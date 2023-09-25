export interface Props {
    title: string;
}

export interface Addresses {
    address: string;
    rating?: number;
    deliveryPrice?: number;
}

export interface InitialDelivery {
    name: string;
    addresses: Array<Addresses>;
    isEditable?: boolean;
    isAddable?: boolean;
}