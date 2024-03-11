export interface Props {
    setPaymentModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface InfoData {
    title: {
        value: string;
        className?: string;
    };
    description?: {
        value: string;
        className?: string;
    };
}

export interface InfoListProps {
    items: Array<InfoData>;
}

export interface InfoItemProps {
    title: InfoData['title'];
    description?: InfoData['description'];
}