//Importing the mongoose library used to make the mongodb connection
const mongoose = require("mongoose")

const connectToDB = async () => {
    try {
        //creating the mongodb database connection by using MONOG_DB_URI
        await mongoose.connect(process.env.DB_CONN_STRING);
        console.log("Connected to DB");
    } catch (error) {
        console.log("Could not connect to DB");
        process.exit(1);
    }
};

module.exports = connectToDB;