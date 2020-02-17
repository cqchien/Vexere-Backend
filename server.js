require("dotenv").config(); // use module dotenv to use file .env. It stores variable which we add to env varialbes

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 3003;

// connect to database
mongoose
  .connect(process.env.MONGO_URL, {
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

app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
