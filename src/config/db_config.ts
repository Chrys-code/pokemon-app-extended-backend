const mongoose = require("mongoose")

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONN_STRING);
        console.log("Connected to DB");
    } catch (error) {
        console.log("Could not connect to DB");
        process.exit(1);
    }
};

module.exports = connectToDB;