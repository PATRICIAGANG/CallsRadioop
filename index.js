const { spawn } = require("child_process");

const env = require("./env");
const { client, gramtgcalls } = require("./client");

const processes = new Map();

const getArgs = (input) =>
  (
    "-y " +
    `-i ${input} ` +
    "-c copy " +
    "-acodec pcm_s16le " +
    "-f s16le " +
    "-ac 1 " +
    "-ar 65000 " +
    "pipe:1"
  ).split(/\s/);

const stream = async (chatId, input) => {
  if (processes.has(chatId)) {
    processes.get(chatId).kill();
  }

  const process = spawn("ffmpeg", getArgs(input));
  processes.set(chatId, process);
  await gramtgcalls.stream(chatId, process.stdout, {
    onFinish: () => stream(chatId, input),
  });
};

(async () => {
  await client.start({ botAuthToken: "" });
  await stream(env.CHAT_ID, env.RADIO_URI);
})();
