import { Request, Response } from "express";
import { User } from "../models/user.model";

const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs');
const userModel = require("../models/user.model");


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
            bcrypt.hash(password, 10)
                .then((hash: string) => {
                    const user = new userModel({
                        email: email,
                        password: hash,
                    });

                    // Save User
                    user.save()
                        .then((response: User) => {
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

        // IMPORTANT
        // Looks like this can be given any password....
        const matchPassword: boolean = bcrypt.compare(password, dbUser.password);

        if (matchPassword) {
            // TO DO
            // Sign JWT Token with email & pw

            return res.status(200).json({
                accessToken: "",
                user: {
                    id: dbUser._id,
                    email: dbUser.email
                },
            })
        }

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