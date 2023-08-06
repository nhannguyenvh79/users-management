import express from "express";
import { accounts } from "../data/mockData.js";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

authRouter.post("/login", (req, res) => {
    const { email, password } = req.body;
    //check account:
    if (!email || !password) {
        return res
            .status(401)
            .json({ message: "Can not find email & password" });
    }

    const existAccount = accounts.find(
        (acc) => acc.email === email && acc.password === password
    );

    if (!existAccount)
        return res.status(401).json({ message: "Invalid email & password" });

    //createtoken:
    const jwtPayload = {
        id: existAccount.id,
        email: existAccount.email,
        type: existAccount.type,
    };

    const token = jwt.sign(jwtPayload, process.env.SECRET_KEY, {
        expiresIn: "60s",
    });

    res.json({
        account: jwtPayload,
        accessToken: token,
    });
});

authRouter.post("/signup", (req, res) => {
    const existAccount = accounts.find((acc) => acc.email === req.body.email);

    if (existAccount) {
        return res.json({ message: "Account already exists" });
    }

    if (!existAccount) {
        const jwtPayload = {
            id: uuid(),
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

authRouter.post("/signup/confirm", (req, res) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        return res.status(400).json({
            message: "token is not provided",
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decoded);
        const email = decoded.email;

        if (email) {
            const newAccount = {
                id: uuid(),
                email: req.body.email,
                password: req.body.password,
                token: "",
                type: "member",
            };
            accounts.push(newAccount);
            console.log(accounts);
        } else {
            throw new Error({ message: "cannot access" });
        }
    } catch (error) {
        return res.status(401).json(error);
    }
});

export default authRouter;
