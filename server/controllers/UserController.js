import { ConfigController } from "./ConfigController.js";

export class UserController extends ConfigController {
    setAddress = async (req, res) => {
        const token = req.headers.authorization?.split(" ")[1];

        try {
            const user = await this._getUser(token);

            user.addresses = [...user.addresses, req.body];

            const savedUser = await user.save();
            const { addresses } = savedUser.toObject();

            res.json({ addresses, newAddress: addresses[addresses.length - 1], message: "Адрес добавлен" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message || "Во время добавления адреса произошла ошибка" });
        }
    };

    updateDeliveryInfo = async (req, res) => {
        const token = req.headers.authorization?.split(" ")[1];
        const { id, method } = req.body;

        try {
            const user = await this._getUser(token);
            const address = await this._getDeliveryInfo({ id, method, user });

            user.deliveryInfo = { id, method };

            await user.save();

            res.json({ deliveryInfo: address, message: "Адрес обновлен" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message || "Во время обновления адреса произошла ошибка" });
        }
    };

    updatePaymentInfo = async (req, res) => {
        const token = req.headers.authorization?.split(" ")[1];
        const { method } = req.body;

        try {
            const user = await this._getUser(token);

            user.paymentInfo = method;

            await user.save();

            res.json({ message: "Метод оплаты обновлен" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message || "Во время обновления метода оплаты произошла ошибка" });
        }
    };
}

export const userController = new UserController();