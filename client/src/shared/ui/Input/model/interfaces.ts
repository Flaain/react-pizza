export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string | null;
    label?: string;
}