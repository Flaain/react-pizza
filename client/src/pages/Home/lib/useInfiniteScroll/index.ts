import React from "react";
import { useAppSelector } from "@/shared/model/store";
import { appSelector } from "@/shared/model/selectors";
import { UseInfiniteScrollOptions } from "../../model/interfaces";

const useInfiniteScroll = <T extends HTMLElement>({ callback, root, rootMargin, threshold, deps }: UseInfiniteScrollOptions) => {
    const { products, _meta } = useAppSelector(appSelector);

    const observer = React.useRef<IntersectionObserver | null>(null);

    const ref = React.useCallback((node: T) => {
        if (deps.every(Boolean)) {
            observer.current?.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && _meta!.total_pages > _meta!.current_page && _meta!.total_items > products.length) {
                    callback(_meta!.current_page + 1, new URLSearchParams(document.location.search));
                }
            }, { root, rootMargin, threshold });
            node && observer.current.observe(node);
        }
    }, [deps, callback]);

    return ref;
};

export default useInfiniteScroll;