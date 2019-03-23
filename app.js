require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("./middleware/jwt");
const errorHandler = require("./middleware/error-handler");
const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use("/users", require("./controllers/users"));

// global error handler
app.use(errorHandler);

// connect mongodb
mongoose.connect(process.env.MONGODB_CONN_STRING, {
  useCreateIndex: true,
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;

// start server
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;
app.listen(port, function() {
  console.log("Server listening on port " + port + " " + process.env.NODE_ENV);
});
