export interface Tabs {
    menu?: string;
    img?: string;
    method?: string;
    title: string;
}

export interface HandleChangeArgs {
    tabMenu: string;
    title: string;
    method: string | undefined;
}