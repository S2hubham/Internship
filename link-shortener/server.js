const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const urlRoutes = require("./routes/urlRoutes");
const app = express();
const rateLimit = require("express-rate-limit");

mongoose
    .connect("mongodb://localhost/urlshortener")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later.",
});

app.use(limiter);

app.set("view engine", "ejs");

app.use("/", urlRoutes);

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
