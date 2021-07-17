const { TelegramClient } = require("telegram");
const { Logger } = require("telegram/extensions");
const { StringSession } = require("telegram/sessions");
const { GramTGCalls } = require("gram-tgcalls");

Logger.setLevel("errors");

const env = require("./env");

exports.client = new TelegramClient(
  new StringSession(env.STRING_SESSION),
  env.API_ID,
  env.API_HASH,
  { connectionRetries: 15 }
);

exports.gramtgcalls = new GramTGCalls(exports.client);
