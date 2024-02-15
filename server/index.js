import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { routes } from "./routes/index.js";

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(express.json(), cors(), ...routes);

(async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.olz1fld.mongodb.net/react-pizza?retryWrites=true&w=majority`
        );
        app.listen(PORT, () => console.log(`server started at ${PORT} port`));
    } catch (error) {
        console.log(error);
    }
})();