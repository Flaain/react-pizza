import { IToast } from "../lib/toast/types";

export class Observer {
    protected subscribers: Array<(toast: IToast) => void>;

    constructor() {
        this.subscribers = [];
    }

    subscribe = (subscriber: (toast: IToast) => void) => {
        this.subscribers.push(subscriber);

        return () => {
            this.subscribers.splice(this.subscribers.indexOf(subscriber), 1);
        };
    };
}