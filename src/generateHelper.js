// Generate json file described all bot's functions
module.exports = async function loadCommands(bot) {
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
};
