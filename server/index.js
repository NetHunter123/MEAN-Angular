const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const config = require("./config/db");
const account = require("./routes/account");
const Post = require("./models/post");


mongoose.set("strictQuery", false);

const app = express();

const port = 3000;
// app.use(session({...}));
app.use(
  require("express-session")({
    secret: config.secret,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

app.use(cors());
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true,parameterLimit:1000000}));

mongoose.connect(config.db);
mongoose.connection.on("connected", () => {
  console.log("successful connection to db");
});
mongoose.connection.on("error", (err) => {
  console.log("not successful connection to db:  " + err);
});

app.listen(port, () => {
  console.log("Server was started on port:\n" + `http://localhost:${port}`);
});

app.get("/", (req, res) => {
  Post.find().then(posts=>res.json(posts))
});

app.use("/account", account);
