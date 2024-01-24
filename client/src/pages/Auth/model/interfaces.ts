export interface FormProps {
    setActiveForm: React.Dispatch<React.SetStateAction<string>>;
}

export interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
}