import jwt from "jsonwebtoken";

const checkAuth = (types) => {
    return (req, res, next) => {
        const token = req.headers["x-access-token"];

        if (!token) {
            return res.status(400).json({
                message: "token is not provided",
            });
        }
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            const isAccess = types?.includes(decoded.type);

            if (isAccess) {
                next();
            } else {
                throw new Error({ message: "cannot access" });
            }
        } catch (error) {
            return res.status(401).json(error);
        }
    };
};
export default checkAuth;
