export interface Props {
    children: React.ReactNode;
    stateUpdater?: React.Dispatch<React.SetStateAction<boolean>>;
    paramsUpdater?: () => void;
}