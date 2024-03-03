import { BaseAPI } from "./baseAPI";
import { CartAPI } from "./cartAPI";
import { UserAPI } from "./userAPI";

export const api = { base: new BaseAPI(), cart: new CartAPI(), user: new UserAPI() };