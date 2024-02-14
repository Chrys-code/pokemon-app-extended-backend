const mongoose = require("mongoose")
import ConfigManager from "./configManager";

const connectToDB = async () => {
    try {
        await mongoose.connect(ConfigManager.DB_CONN_STRING);
        console.log("Connected to DB");
    } catch (error) {
        console.log("Could not connect to DB");
        process.exit(1);
    }
};

export default connectToDB;