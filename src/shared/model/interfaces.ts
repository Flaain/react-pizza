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