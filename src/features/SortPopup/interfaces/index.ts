export interface Names {
    id: number;
    name: string;
    sort: string;
    img?: string;
}

export interface Props {
    names: Array<Names>;
    currentSort: number;
    setCurrentSort: React.Dispatch<React.SetStateAction<number>>;
}