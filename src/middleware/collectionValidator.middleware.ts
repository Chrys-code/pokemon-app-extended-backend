const validator = require("../utils/validator");
import { NextFunction, Request, Response } from "express";


const pokemonsSchemaValidator = async (req: Request, res: Response, next: NextFunction) => {
    const validateRule = {
        "user": "required|string",
        "pokemons": "[string]",
    }

    await validator(req.body, validateRule, {}, (err: any, status: any) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                })

        } else {
            next();
        }
    }).catch((err: any) => console.log(err))
}

module.exports = {
    pokemonsSchemaValidator
}