require("dotenv").config(); // use module dotenv to use file .env. It stores variable which we add to env varialbes

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config");
const app = express();
const port = config.port;

// connect to database
mongoose
  .connect(`${config.mongoURL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(console.log("Connect to DB successfully !"))
  .catch(console.log);

// middleware body-parser
app.use(bodyParser.json()); // for paresing application/json
app.use(bodyParser.urlencoded({ extended: true }));

// middleware router
app.use("/api", require("./routes/api"));
app.use("/upload", express.static("./upload"));

app.listen(port, () => {
  console.log(`App is running on port`);
});
