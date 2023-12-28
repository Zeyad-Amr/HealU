import jwt from "jsonwebtoken"

const createToken = (payload: string | object) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET as string);
    return token;
};

const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET as string)
}

export default {
    createToken,
    verifyToken,
}