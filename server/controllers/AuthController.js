import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export class AuthController {
    static signup = async (req, res) => {
        try {
            const { email, name, password } = req.body;

            const candidate = await User.findOne({ email });

            if (candidate) return res.status(400).json({ status: 400, message: "Пользователь с такой почтой уже существует" });

            const hashPassword = bcrypt.hashSync(password);
            const user = new User({ name, email, password: hashPassword });

            const savedUserObj = (await user.save()).toObject();
            const token = jwt.sign({ id: savedUserObj._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

            const { password: hashedPassword, __v, ...rest } = savedUserObj;

            return res.json({ data: { ...rest, token }, message: "Пользователь успешно зарегистрирован" });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Во время регистрации произошла непредвиденная ошибка",
            });
        }
    };

    static signin = async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email }).lean();
            const isPasswordValid = user && bcrypt.compareSync(password, user.password);

            if (!isPasswordValid) return res.status(400).json({ message: "Неверный логин или пароль" });

            const { password: hashedPassword, __v, ...rest } = user;

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

            return res.json({ data: { ...rest, token }, message: "Авторизация прошла успешно" });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Во время авторизации произошла непредвиденная ошибка",
            });
        }
    };

    static profile = async (req, res) => {
        try {
            const token = req.headers.authorization.split(" ")[1];

            if (!token) return res.status(403).json({ message: "Доступ запрещен" });
            
            const { id } = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findById(id).lean();

            if (!user) return res.status(403).json({ message: "Доступ запрещен" });

            const { password: hashedPassword, __v, ...rest } = user;

            return res.json({ data: { ...rest } })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "При запросе профиля произошла ошибка",
            });
        }
    };
}