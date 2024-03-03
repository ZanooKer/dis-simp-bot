const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const { Player } = require("discord-player");
const fs = require("node:fs");
const path = require("node:path");
const config = require("../config.json");

// Create bot client with permission
const PERMISSION_LIST = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildVoiceStates,
];
const client = new Client({ intents: PERMISSION_LIST });

client.commands = new Collection();
client.cooldowns = new Collection();
client.say = require("./modules/reply");
client.utils = require("./modules/utils");

//Load music player
const player = Player.singleton(client);
player.extractors.loadDefault();

// login bot client
client.once(Events.ClientReady, (client) => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
});
require("./handlers/event")(client);
client.login(config.token);

// Load all commands
// client.commands = new Collection();
// const foldersPath = path.join(__dirname, "commands");
// const commandFolders = fs.readdirSync(foldersPath);

// for (const folder of commandFolders) {
//   const commandsPath = path.join(foldersPath, folder);
//   const commandFiles = fs
//     .readdirSync(commandsPath)
//     .filter((file) => file.endsWith(".js"));
//   for (const file of commandFiles) {
//     const filePath = path.join(commandsPath, file);
//     const command = require(filePath);
//     if ("data" in command && "execute" in command) {
//       client.commands.set(command.data.name, command);
//     } else {
//       console.log(
//         `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
//       );
//     }
//   }
// }

// Execute command from input
// client.on(Events.InteractionCreate, async (interaction) => {
//   if (!interaction.isChatInputCommand()) return;

//   const command = interaction.client.commands.get(interaction.commandName);

//   if (!command) {
//     console.error(`No command matching ${interaction.commandName} was found.`);
//     return;
//   }

//   try {
//     await command.execute(interaction);
//   } catch (error) {
//     console.error(error);
//     if (interaction.replied || interaction.deferred) {
//       await interaction.followUp({
//         content: "There was an error while executing this command!",
//         ephemeral: true,
//       });
//     } else {
//       await interaction.reply({
//         content: "There was an error while executing this command!",
//         ephemeral: true,
//       });
//     }
//   }
// });