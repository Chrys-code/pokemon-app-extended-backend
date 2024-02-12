import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const cors = require("cors");
const connectToDB = require("./src/config/db_config");

const authRoute = require("./src/routes/auth");
const pokemonsRoute = require("./src/routes/pokemons");

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

// Connect to database
connectToDB();

const corsOptions = {
    credentials: true,
    origin: process.env.ALLOW_ORIGIN
};


// Set up middlewares
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN);
    res.header('Access-Control-Allow-Headers', 'true');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});


// Connect routes
app.use("/auth", authRoute);
app.use("/pokemons", pokemonsRoute);

app.get("/ping", (req: Request, res: Response) => {
    res.send("alive!");
});

app.listen(port, () => {
    // console.log(`[server]: Server is running at http://localhost:${port}`);
});


module.exports = app;