import express from "express";
import { accounts } from "../data/mockData.js";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

authRouter.post("/login", (req, res) => {
    const { email, password } = req.body;
    //check account:
    if (!email || !password) {
        return res
            .status(401)
            .json({ message: "can not find email & password" });
    }

    const existAccount = accounts.find(
        (acc) => acc.email === email && acc.password === password
    );

    !existAccount &&
        res.status(401).json({ message: "invalid email & password" });

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

export default authRouter;
