require("dotenv").config();
const express = require("express");
const mongoose = require("./utils/db");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bodyParser = require("body-parser");

require("./config/passport");

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static('public'));  


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);


app.use(passport.initialize());
app.use(passport.session());


app.use("/auth", require("./routes/authRoutes"));
app.use("/events", require("./routes/eventRoutes"));
app.use("/registrations", require("./routes/registrationRoutes"));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
