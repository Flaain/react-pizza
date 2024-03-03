import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { ConfigController } from "./ConfigController.js";
import { Order } from "../models/Order.js";

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
            res.status(500).json({
                message: "Во время регистрации произошла непредвиденная ошибка",
            });
        }
    };

    signin = async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email }).lean();
            const isPasswordValid = user && bcrypt.compareSync(password, user.password);

            if (!isPasswordValid) return res.status(400).json({ message: "Неверный логин или пароль" });

            const { password: hashedPassword, __v, ...rest } = user;
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
            
            const updateCart = await this._revalidateCart(user.cart);
            const orders = await Order.find({ user: user._id }).lean();
            
            return res.json({ user: { ...rest, ...updateCart, orders, token }, message: "Авторизация прошла успешно" });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Во время авторизации произошла непредвиденная ошибка",
            });
        }
    };

    profile = async (req, res) => {
        try {
            const token = req.headers.authorization.split(" ")[1];

            if (!token) return res.status(403).json({ message: "Доступ запрещен" });

            const user = await this._getUser(token);
            const updateCart = await this._revalidateCart(user.cart.toObject());
            const orders = await Order.find({ user: user._id }).lean();

            const { password, ...rest } = user.toObject();

            return res.json({ user: { ...rest, ...updateCart, orders }, message: "Профиль успешно получен" });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "При запросе профиля произошла ошибка",
            });
        }
    };
};

export const authController = new AuthController();