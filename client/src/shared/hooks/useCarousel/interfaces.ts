export interface Props {
    scrollRef: React.RefObject<HTMLUListElement | null>;
    items: Array<unknown>;
    options?: Options;
}

export interface Options {
    slidesToShow: number;
    slidesToScroll: number;
    gap: number;
}