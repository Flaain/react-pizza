import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { BaseController } from "./BaseController.js";

export class AuthController extends BaseController {
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
            const extraInfo = await this._getExtraInfo(user._id);
            const deliveryInfo = user.deliveryInfo && (await this._getDeliveryInfo({
                id: user.deliveryInfo.id,
                method: user.deliveryInfo.method,
                throwError: false,
                user
            }));

            !deliveryInfo && user.deliveryInfo && (user.deliveryInfo = undefined);

            const savedUser = await user.save();
            const { password: hashedPassword, __v, ...rest } = savedUser.toObject();

            return res.json({ user: { ...rest, ...updateCart, extraInfo, deliveryInfo, token }, message: "Авторизация прошла успешно" });
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
            const extraInfo = await this._getExtraInfo(user._id);
            const deliveryInfo = user.deliveryInfo && (await this._getDeliveryInfo({
                id: user.deliveryInfo.id,
                method: user.deliveryInfo.method,
                throwError: false,
                user
            }));

            !deliveryInfo && user.deliveryInfo && (user.deliveryInfo = undefined);

            const savedUser = await user.save();
            const { password, addresses, ...rest } = savedUser.toObject();
            
            return res.json({
                user: {
                    ...rest,
                    ...updateCart,
                    extraInfo,
                    deliveryInfo,
                    addresses: addresses.map(({ _id, ...rest }) => ({ id: _id, ...rest })),
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