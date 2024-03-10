export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    quantity: number | null;
    loading?: boolean;
}