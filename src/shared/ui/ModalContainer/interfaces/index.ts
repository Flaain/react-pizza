export interface Props {
    children: React.ReactNode;
    updater: React.Dispatch<React.SetStateAction<boolean>>;
}