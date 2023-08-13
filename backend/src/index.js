import express from "express";
import cors from "cors";
import { usersRouter } from "./router/usersRouter.js";
import authRouter from "./router/authRouter.js";
import "dotenv/config";
import { connectToDB } from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", usersRouter);
app.use("/auth", authRouter);

connectToDB(app);
