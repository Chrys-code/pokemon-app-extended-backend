import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from './swagger.json'
import cors from 'cors';
import connectToDB from './src/config/db_config';

import authRoute from './src/routes/auth';
import pokedexRoute from './src/routes/pokedex';
import ConfigManager from "./src/config/configManager";

const app: Express = express();
const port = ConfigManager.PORT;

// Connect to database
connectToDB();

const corsOptions = {
    credentials: true,
    origin: ConfigManager.ALLOW_ORIGIN
};


// Set up middlewares
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', ConfigManager.ALLOW_ORIGIN);
    res.header('Access-Control-Allow-Headers', 'true');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});


// Connect routes
app.use("/auth", authRoute);
app.use("/pokedex", pokedexRoute);

app.get("/ping", (req: Request, res: Response) => {
    res.send("alive!");
});

app.listen(port, () => {
    // console.log(`[server]: Server is running at http://localhost:${port}`);
});


module.exports = app;