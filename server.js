require("dotenv").config();

const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/database");

const referenceRoutes = require("./routes/referenceRoutes");
const projectRoutes = require("./routes/projectRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

connectDB();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "COMP229 Assignment 2 Backend API is running."
    });
});

app.use("/api/references", referenceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/users", userRoutes);

app.use((req, res, next) => {
    next(createError(404, "Route not found"));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

const PORT = process.env.PORT || 3000;

if (process.env.VERCEL !== "1") {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;