const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        return;
    }

    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI is missing.");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    isConnected = true;
    console.log("MongoDB connected successfully.");
};

module.exports = connectDB;