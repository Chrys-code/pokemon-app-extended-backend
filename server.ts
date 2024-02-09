import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

const cors = require("cors");
const connectToDB = require("./src/config/db_config");

const authRoute = require("./src/routes/auth");
const pokemonsRoute = require("./src/routes/pokemons");

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

connectToDB();
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRoute);
app.use("/pokemons", pokemonsRoute);

app.get("/ping", (req: Request, res: Response) => {
    res.send("alive!");
});

app.listen(port, () => {
    // console.log(`[server]: Server is running at http://localhost:${port}`);
});


module.exports = app;