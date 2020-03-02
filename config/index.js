const dotenv = require("dotenv");
dotenv.config();

let mongoURL;
let port;
let secretKey;
let email;
let password;

switch (process.env.NODE_ENV) {
  case "local":
    mongoURL = process.env.LOCAL_MONGO_URL;
    port = process.env.LOCAL_PORT;
    secretKey = process.env.LOCAL_SECRET_KEY;
    email = process.env.LOCAL_EMAIL;
    password = process.env.LOCAL_PASSWORD;
    break;
  case "staging":
    mongoURL = process.env.STAGING_MONGO_URL;
    port = process.env.STAGING_PORT;
    secretKey = process.env.STAGING_SECRET_KEY;
    email = process.env.STAGING_EMAIL;
    password = process.env.STAGING_PASSWORD;
    break;
}

console.log(mongoURL);
module.exports = {
  mongoURL,
  port,
  secretKey,
  email,
  password
};
