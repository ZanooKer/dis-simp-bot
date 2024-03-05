const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const config = require("../config.json");
const { Player } = require("discord-player");
const { readdirSync } = require("fs");
const { useMainPlayer } = require("discord-player");

// Create bot client with permission
const PERMISSION_LIST = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.MessageContent,
];
const client = new Client({
  intents: PERMISSION_LIST,
  disableMentions: "everyone",
});

// Login bot client
client.once(Events.ClientReady, (client) => {
  console.log(`Logged in as ${client.user.tag}`);
});
client.commands = new Collection();
client.login(config.app.token);

// Setting music player property
const playerSetting = new Player(client, config.opt.discordPlayer);
playerSetting.extractors.loadDefault();

// Load all events
// 'Events' is triggered according to channel automatically, like 'disconnect'
const player = useMainPlayer();
CommandsArray = [];

const DiscordEvents = readdirSync("./src/events/discord/").filter((file) =>
  file.endsWith(".js")
);

for (const file of DiscordEvents) {
  const DiscordEvent = require(`./events/discord/${file}`);
  const actionName = file.split(".")[0];
  console.log(`-> [Loaded Discord Event] ${actionName}`);
  client.on(actionName, DiscordEvent.bind(null, client));
  delete require.cache[require.resolve(`./events/discord/${file}`)];
}
const PlayerEvents = readdirSync("./src/events/player/").filter((file) =>
  file.endsWith(".js")
);

for (const file of PlayerEvents) {
  const PlayerEvent = require(`./events/player/${file}`);
  const actionName = file.split(".")[0];
  console.log(`-> [Loaded Player Event] ${actionName}`);
  player.events.on(actionName, PlayerEvent.bind(null));
  delete require.cache[require.resolve(`./events/player/${file}`)];
}

// Load all commands
// 'Commands' is triggered by message, like 'zping'.
readdirSync("./src/commands/").forEach((dirs) => {
  const commands = readdirSync(`./src/commands/${dirs}`).filter((files) =>
    files.endsWith(".js")
  );

  for (const file of commands) {
    const command = require(`./commands/${dirs}/${file}`);
    if (command.name && command.description) {
      CommandsArray.push(command);
      console.log(`-> [Loaded Command] ${command.name.toLowerCase()}`);
      client.commands.set(command.name.toLowerCase(), command);
      delete require.cache[require.resolve(`./commands/${dirs}/${file}`)];
    } else console.log(`[failed Command]  ${command.name.toLowerCase()}`);
  }
});

// Set commands as suggestion in message chat
client.on("ready", (client) => {
  if (config.app.global) client.application.commands.set(CommandsArray);
  else client.guilds.cache.get(config.app.guild).commands.set(CommandsArray);
});
