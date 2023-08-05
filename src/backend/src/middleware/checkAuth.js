import Jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(400).json({
            message: "token is not provided",
        });
    }
    try {
        const decoded = Jwt.verify(token, process.env.SECRET_KEY);
        console.log(decoded);
        next();
    } catch (error) {
        console.log(error);
        res.json(error);
    }
};
export default checkAuth;
