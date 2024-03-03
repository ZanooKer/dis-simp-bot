const { REST, Routes, SlashCommandBuilder } = require("discord.js");
const { clientId, devGuildId, token } = require("./config.json");
const fs = require("node:fs");
const path = require("node:path");

// This file is used to create interface to discord server
const commands = [];
const foldersPath = path.join(__dirname, "src/commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("name" in command && "description" in command && "execute" in command) {
      const commandJSON = new SlashCommandBuilder()
        .setName(command.name)
        .setDescription(command.description)
        .toJSON();
      commands.push(commandJSON);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

const rest = new REST().setToken(token);

(async () => {
  try {
    console.log(commands);
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );
    let data = [];
    if (process.env?.NODE_ENV === "dev") {
      data = await rest.put(
        Routes.applicationGuildCommands(clientId, devGuildId),
        {
          body: commands,
        }
      );
    } else {
      data = await rest.put(Routes.applicationCommands(clientId), {
        body: commands,
      });
    }

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
})();
