require("dotenv").config(); // use module dotenv to use file .env. It stores variable which we add to env varialbes

const express = require("express");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(console.log("Connect to DB successfully !"))
  .catch(console.log);

const app = express();
const port = 3003;

app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
