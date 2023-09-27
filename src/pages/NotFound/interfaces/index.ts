export interface Props {
    title: string;
    description?: string;
    backLink?: boolean;
    backLinkText?: string;
    reloadButton?: boolean;
    reloadButtonText?: string;
    screen?: boolean;
    code?: Error | unknown;
}