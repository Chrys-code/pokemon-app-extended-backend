import { Request, Response } from "express";
import { User } from "../models/user.model";

const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs');
const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken');


const register = asyncHandler(async (req: Request, res: Response) => {

    // Get data
    const { email, password } = req.body;

    try {
        // Verify against existing users
        const verifyEmail = await userModel.findOne({ email: email })
        if (verifyEmail) {
            return res.status(403).json({
                message: "Email already in use!"
            })
        } else {

            // Hash PW & Save user model
            await bcrypt.hash(password, 10)
                .then((hash: string) => {
                    const user: User = new userModel({
                        email: email,
                        password: hash,
                    });

                    // Save User
                    user.save()
                        .then((response: User) => {

                            let jwtToken = jwt.sign(
                                {
                                    email: user.email,
                                    userId: user._id
                                },
                                process.env.JWT_SECRET,
                                {
                                    expiresIn: "1h"
                                }
                            )


                            res.cookie("Authorization", `${jwtToken}`);

                            return res.status(201).json({
                                message: 'user created!',
                                user: {
                                    id: response._id,
                                    email: response.email
                                },
                            })
                        })
                        .catch((err: any) => {
                            res.status(500).json({
                                error: err,
                            })
                        })
                })
        }
    } catch (err: any) {
        return res.status(412).send({
            success: false,
            message: err.message
        })
    }
});


const login = asyncHandler(async (req: Request, res: Response) => {

    const { email, password } = req.body;

    // Get DB User
    const dbUser: User | undefined = await userModel.findOne({
        email: email,
    });

    if (!dbUser) {
        return res.status(401).json({
            message: "Authentication Failed",
        })
    }

    try {
        // Check if pw is matching

        const matchPassword: boolean = await bcrypt.compare(password, dbUser.password);

        if (matchPassword) {
            // TO DO
            // Sign JWT Token with email & pw

            let jwtToken = jwt.sign(
                {
                    email: dbUser.email,
                    userId: dbUser._id
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1h"
                }
            )

            res.cookie("Authorization", `${jwtToken}`);

            return res.status(200).json({
                user: {
                    id: dbUser._id,
                    email: dbUser.email
                },
            })
        }

        return res.status(401).json({
            message: "password not matching"
        })

    } catch (err: any) {
        return res.status(500).json({
            message: err.message,
        })
    }
});

module.exports = {
    register,
    login,
}