import React from "react";

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    hasEye?: boolean;
    label?: string;
    error?: string | null;
}