export class ApiError extends Error {
    readonly endpoint: string;
    readonly status?: number;

    constructor({ endpoint, message, status }: { endpoint: string; message: string; status?: number }) {
        super(message);

        this.endpoint = endpoint;
        this.status = status;
    }
}