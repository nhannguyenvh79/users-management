import express from "express";
import jwt from "jsonwebtoken";
import { db } from "../db.js";

const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    //check account:

    if (!email || !password) {
        return res
            .status(401)
            .json({ message: "Can not find email & password" });
    }

    const existAccount = await db("accounts").findOne({
        email: email,
        password: password,
    });

    if (!existAccount)
        return res.status(401).json({ message: "Invalid email & password" });

    //createtoken:
    const jwtPayload = {
        id: existAccount._id,
        email: existAccount.email,
        type: existAccount.type,
    };

    const token = jwt.sign(jwtPayload, process.env.SECRET_KEY, {
        expiresIn: "120s",
    });

    res.json({
        account: jwtPayload,
        accessToken: token,
    });
});

authRouter.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const existAccount = await db("accounts").findOne({
        email: email,
        password: password,
    });

    if (existAccount) {
        return res.json({ message: "Account already exists" });
    }

    if (!existAccount) {
        const jwtPayload = {
            type: "member",
            email: req.body.email,
        };

        const token = jwt.sign(jwtPayload, process.env.SECRET_KEY, {
            expiresIn: "30s",
        });

        res.json({
            newAccount: jwtPayload,
            signUpToken: token,
        });
    }
});

authRouter.post("/signup/confirm", async (req, res) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        return res.status(400).json({
            message: "token is not provided",
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const email = decoded.email;

        if (email) {
            const newAccount = {
                email: req.body.email,
                password: req.body.password,
                token: "",
                type: "member",
            };
            await db("accounts").insertOne(newAccount);
            res.json({ message: "successfully" });
        } else {
            throw new Error({ message: "cannot access, please signup again" });
        }
    } catch (error) {
        return res.status(401).json(error);
    }
});

export default authRouter;
