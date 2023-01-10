import { FC, useLayoutEffect } from "react";

interface Props {
    selectAll?: boolean;
    selector: string;
    callback: Function;
    settings?: IntersectionObserverInit;
}

export const MyObserver: FC<Props> = ({
    selectAll = true,
    selector,
    callback,
    settings = { threshold: 0.5 },
}) => {
    useLayoutEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => callback(entries),
            settings
        );

        if (selectAll) {
            const selected = document.querySelectorAll(selector);
            selected.forEach((element) => {
                observer.observe(element as Element);
            });
        } else {
            const selected = document.querySelector(selector);
            observer.observe(selected as Element);
        }

        return () => {
            observer.disconnect();
        };
    }, [selectAll, selector, callback, settings]);

    return null;
};
