export interface Props {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}