import React from "react";

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    isPasswordVisible?: boolean;
    hasEye?: boolean;
    label?: string;
    error?: string | null;
    onEyeClick?: () => void;
}