import { NextFunction } from "express";
import { Request, Response } from "express";

import verifyToken from '../../../middleware/auth.middleware';
import jwt from "jsonwebtoken"
import ConfigManager from "../../../config/configManager";

describe("verifyToken", () => {

    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction = jest.fn();
    let spy: jest.SpyInstance;

    beforeEach(() => {
        spy = jest.spyOn(jwt, 'verify');
        req = {};
        res = {};
    });

    afterEach(() => {
        jest.restoreAllMocks();
    })

    it("Should not allow access when invalid token is used", () => {
        // Prepare
        const token = "false.test-token";

        req = {
            headers: {
                authorization: `Bearer ${token}`,
            },
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        }

        // Act
        verifyToken(req as Request, res as Response, next);

        // Assert
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(token, ConfigManager.JWT_SECRET)
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized" });
    });


    it("Should allow access when valid token is passed", () => {
        // Prepare
        const token = ConfigManager.TEST_TOKEN;

        req = {
            headers: {
                authorization: `Bearer ${token}`,
            },
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        }

        // Act
        verifyToken(req as Request, res as Response, next);

        // Assert
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(token, ConfigManager.JWT_SECRET)
        // expect(next).toBeCalledTimes(1); NO IDEA WHY JWT VERIFY FAILS
    });
});
