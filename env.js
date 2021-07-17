const { config } = require("dotenv");
const { cleanEnv, str, num } = require("envalid");

config();

module.exports = cleanEnv(process.env, {
  STRING_SESSION: str(),
  API_ID: num(),
  API_HASH: str(),
  CHAT_ID: num(),
  RADIO_URI: str(),
});
