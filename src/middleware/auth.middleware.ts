const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";
import ConfigManager from "../config/configManager";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.replace("Bearer ", "");
        const decoded = jwt.verify(token, ConfigManager.JWT_SECRET);

        const { userId } = decoded;
        res.locals.userId = userId;

        next();
    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
};

export default verifyToken;