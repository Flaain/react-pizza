import { API } from "./api";

export const api = new API({ baseUrl: import.meta.env.VITE_BASE_URL, headers: { "Content-Type": "application/json" } });