const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const config = require("./config/db");

mongoose.set('strictQuery', false);

const app = express();

const port = 3000;

mongoose.connect(config.db);
mongoose.connection.on('connected',()=>{
    console.log("successful connection to db")
})
mongoose.connection.on('error',(err)=>{
    console.log("not successful connection to db:  "+ err)
})

app.listen(port, () => {
  console.log("Server was started on port:" + port);
});

app.get("/", (req, res) => {
  res.send("main page of site");
});
