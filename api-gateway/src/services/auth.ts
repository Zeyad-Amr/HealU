import { NextFunction, Request, Response } from "express";
import jwt from "./jwt";

const alwaysAllow = (_1: Request, _2: Response, next: NextFunction) => {
    next();
};
const protect = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("auth-token");

    if (!token)
        return res.status(403).json({ err: "Access denied. No token provided." });

    try {
        const decoded = jwt.verifyToken(token);
        (req as any).user = decoded;
        next();
    } catch (ex) {
        console.log(ex);
        res.status(400).json({ err: "Invalid token." });
    }
}

export { alwaysAllow, protect }
