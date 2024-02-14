import dotenv from "dotenv";

dotenv.config();

const ConfigManager = {
    PORT: process.env.PORT || 8080,
    JWT_SECRET: process.env.JWT_SECRET || "",
    DB_CONN_STRING: process.env.DB_CONN_STRING || "",
    ALLOW_ORIGIN: process.env.ALLOW_ORIGIN || "",
    TEST_TOKEN: process.env.TEST_TOKEN || ""
}

export default ConfigManager