export class Observer {
    protected subscribers: Array<<T>(data: T) => void>;

    constructor() {
        this.subscribers = [];
    }

    subscribe = (subscriber: <T>(data: T) => void) => {
        this.subscribers.push(subscriber);

        return () => {
            this.subscribers.splice(this.subscribers.indexOf(subscriber), 1);
        };
    };

    protected notify = <T>(data: T) => {
        this.subscribers.forEach((subscriber) => subscriber(data));
    };
}