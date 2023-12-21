export interface ValidateParams {
    key: string;
    defaultValue: unknown;
    initial: Array<unknown>;
}

export interface UseInfiniteScrollOptions extends IntersectionObserverInit {
    callback: (page: number, params: URLSearchParams) => void;
    deps: React.DependencyList; 
}