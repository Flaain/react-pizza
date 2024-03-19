import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { ConfigController } from "./ConfigController.js";
import { Order } from "../models/Order.js";
import { months } from "../utils/constants/initial.js";

export class AuthController extends ConfigController {
    signup = async (req, res) => {
        try {
            const { email, name, password } = req.body;

            const candidate = await User.findOne({ email });

            if (candidate) return res.status(400).json({ status: 400, message: "Пользователь с такой почтой уже существует" });

            const hashPassword = bcrypt.hashSync(password);
            const user = new User({ name, email, password: hashPassword });

            const savedUser = await user.save();
            const userObj = savedUser.toObject();

            const token = jwt.sign({ id: userObj._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

            const { password: hashedPassword, __v, ...rest } = userObj;

            return res.json({ user: { ...rest, cart: { items: [], total_price: 0 }, orders: [], token }, message: "Пользователь успешно зарегистрирован" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message || "Во время регистрации произошла непредвиденная ошибка" });
        }
    };

    signin = async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            const isPasswordValid = user && bcrypt.compareSync(password, user.password);

            if (!isPasswordValid) return res.status(400).json({ message: "Неверный логин или пароль" });

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

            const updateCart = await this._revalidateCart(user.cart.toObject());
            const deliveryInfo = user.deliveryInfo && (await this._getDeliveryInfo({
                id: user.deliveryInfo.id,
                method: user.deliveryInfo.method,
                throwError: false,
                user
            }));

            !deliveryInfo && user.deliveryInfo && (user.deliveryInfo = undefined);

            const savedUser = await user.save();
            const { password: hashedPassword, __v, ...rest } = savedUser.toObject();

            return res.json({ user: { ...rest, ...updateCart, deliveryInfo, token }, message: "Авторизация прошла успешно" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message || "Во время авторизации произошла непредвиденная ошибка" });
        }
    };

    profile = async (req, res) => {
        try {
            const token = req.headers.authorization.split(" ")[1];

            if (!token) return res.status(403).json({ message: "Доступ запрещен" });

            const user = await this._getUser(token);
            const updateCart = await this._revalidateCart(user.cart.toObject());
            const deliveryInfo = user.deliveryInfo && (await this._getDeliveryInfo({
                id: user.deliveryInfo.id,
                method: user.deliveryInfo.method,
                throwError: false,
                user
            }));
            const orders = await Order.find({ user: user._id }).lean();

            !deliveryInfo && user.deliveryInfo && (user.deliveryInfo = undefined);

            const savedUser = await user.save();
            const { password, addresses, ...rest } = savedUser.toObject();
            
            const date = new Date();
            const sixMonthsAgo = new Date(date.getFullYear(), date.getMonth() - 6, date.getDate());

            const lastSixMonthsOrders = await Order.find({ createdAt: { $gte: sixMonthsAgo, $lt: date } }).lean();
            
            const lastSixMonthsOrdersMap = new Map();

            lastSixMonthsOrders.forEach(order => {
                const orderDate = new Date(order.createdAt);
                const month = orderDate.getMonth();

                lastSixMonthsOrdersMap.set(month, (lastSixMonthsOrdersMap.get(month) ?? 0) + 1);
            });

            const extraInfo = orders.reduce((acc, order) => {
                const isPayed = order.status === "PAID";
                const totalOrdersPrice = acc.totalOrdersPrice + order.cart.total_price;
                const purchaseAmount = acc.purchaseAmount + (isPayed ? (order.total_amount / 100) : 0);
                const purchasePercent = (purchaseAmount / totalOrdersPrice) * 100;

                return {
                    ...acc,
                    totalItemsCount: acc.totalItemsCount + order.cart.items.length,
                    purchasePercent,
                    purchaseAmount,
                    totalOrdersPrice,
                };
            }, { totalItemsCount: 0, totalOrdersPrice: 0, purchaseAmount: 0, purchasePercent: 0 });
            
            return res.json({
                user: {
                    ...rest,
                    ...updateCart,
                    deliveryInfo,
                    addresses: addresses.map(({ _id, ...rest }) => ({ id: _id, ...rest })),
                    extraInfo: {
                        ordersGoods: orders.flatMap(({ cart: { items } }) => items.map((item) => ({ id: item._id, src: item.imageUrl }))).reverse().slice(0, 5),
                        ordersCount: orders.length,
                        lastSixMonthsOrders: [...lastSixMonthsOrdersMap.entries()].map(([date, count]) => ({ date: months[date], count })),
                        ...extraInfo
                    },
                },
                message: "Профиль успешно получен",
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message || "При запросе профиля произошла ошибка" });
        }
    };
}

export const authController = new AuthController();