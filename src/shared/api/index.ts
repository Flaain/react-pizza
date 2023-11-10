import { API } from "./api";
export type { Order } from "./interfaces";

export const api = new API({ baseUrl: import.meta.env.VITE_BASE_URL, headers: { "Content-Type": "application/json" } });