import { Request, Response } from "express";
import { User } from "../models/user.model";
import userModel from "../models/user.model";
import bcrypt from "bcryptjs";
import ConfigManager from "../config/configManager";

const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');

export const register = asyncHandler(async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {

        const verifyEmail: User | null = await userModel.findOne({ email: email })

        if (verifyEmail) {
            return res.status(403).json({
                success: false,
                message: "Email already in use!"
            })
        }

        const hashedPw = await bcrypt.hash(password, 10);

        if (!hashedPw) {
            return res.status(500).json({
                success: false,
                message: "Could not register user..."
            })
        }

        const user: User = new userModel({
            email: email,
            password: hashedPw,
        });

        const dbUser: User = await user.save();

        if (!dbUser) {
            return res.status(500).json({
                success: false,
                message: "Could not save user..."
            })
        }

        let jwtToken = jwt.sign(
            {
                email: dbUser.email,
                userId: dbUser._id
            },
            ConfigManager.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )

        res.cookie("Authorization", `${jwtToken}`);

        return res.status(201).json({
            success: true,
            user: {
                id: dbUser._id,
                email: dbUser.email
            },
        })

    } catch (err: any) {
        return res.status(500).send({
            success: false,
            message: err.message
        })
    }
});


export const login = asyncHandler(async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {
        const dbUser: User | null = await userModel.findOne({
            email: email,
        });

        if (!dbUser) {
            return res.status(401).json({
                success: false,
                message: "Authentication Failed",
            })
        }

        const matchPassword: boolean = await bcrypt.compare(password, dbUser.password);

        if (!matchPassword) {
            return res.status(401).json({
                success: false,
                message: "Password is not matching",
            })
        }

        let jwtToken = jwt.sign(
            {
                email: dbUser.email,
                userId: dbUser._id
            },
            ConfigManager.JWT_SECRET,
            {
                expiresIn: "24h"
            }
        )

        res.cookie("Authorization", `${jwtToken}`);

        return res.status(200).json({
            success: true,
            user: {
                id: dbUser._id,
                email: dbUser.email
            },
        })

    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
});
