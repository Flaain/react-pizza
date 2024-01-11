import { Field } from "@/shared/hooks/useForm/types";

export interface Props {
    setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Form extends Field {
    label?: string;
}