const fs = require("fs");
const { readdirSync } = require("fs");

// Generate json file described all bot's functions
module.exports = async function loadCommands() {
  let helperJSON = { commands: [] };

  readdirSync("./src/commands/").forEach((dirs) => {
    const categoryJSON = { category: dirs, commands: [] };
    const commands = readdirSync(`./src/commands/${dirs}`).filter((files) =>
      files.endsWith(".js")
    );

    for (const file of commands) {
      const command = require(`./commands/${dirs}/${file}`);

      const commandJSON = {};
      commandJSON["name"] = command.name ?? "";
      commandJSON["description"] = command.description ?? "";
      categoryJSON.commands.push(commandJSON);
    }
    helperJSON.commands.push(categoryJSON);
  });

  fs.writeFile(
    "./helpers.json",
    JSON.stringify(helperJSON, null, 2),
    (error) => {
      if (error) {
        console.log("An error has occurred ", error);
        return;
      }
      console.log("Data written successfully to disk");
    }
  );
};
