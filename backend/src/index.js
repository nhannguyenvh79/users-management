import express from "express";
import cors from "cors";
import { usersRouter } from "./router/usersRouter.js";
import authRouter from "./router/authRouter.js";
import "dotenv/config";

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", usersRouter);
app.use("/auth", authRouter);

app.listen(PORT, (error) => {
    !error ? console.log(`Listening port: ${PORT}`) : console.log(error);
});
