import { RouteObject } from "react-router-dom";
import { CartPage } from "./Cart";
import { NotFoundPage } from "./NotFound";
import { HomePage } from "./Home";
import { ProductDetailsPage } from "./ProductDetails";
import { LKPage } from "./LK";
import { OrdersPage } from "./Orders";

export const pages: Array<RouteObject> = [NotFoundPage, HomePage, CartPage, ProductDetailsPage, LKPage, OrdersPage];