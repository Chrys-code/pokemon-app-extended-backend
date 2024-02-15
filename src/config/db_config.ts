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

export const disconnectFromDB = async () => {
    try {
        await mongoose.connection.close();
        console.log("Disconnected from DB");
    } catch (error) {
        console.log("Could not disconnect from DB");
        process.exit(1);
    }
};

export default connectToDB;