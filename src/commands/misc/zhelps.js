const { EmbedBuilder } = require("discord.js");
const { replyEmbedText, replyText } = require("../../utility/reply");
const fs = require("fs");

module.exports = {
  name: "zhelps",
  description: "Show all commands of this bot",
  async execute({ interaction }) {
    fs.readFile("./helpers.json", "utf8", (error, data) => {
      if (error) {
        console.log(error);
        return;
      }
      try {
        const dataJSON = JSON.parse(data);
        const description = dataJSON.commands
          .map(
            (group) =>
              `Category: ${group.category}\n${group.commands
                .map(
                  (command) =>
                    `/${command.name}----------${command.description}`
                )
                .reduce((p, v) => `${p}\n${v}`, "")}`
          )
          .reduce((p, v) => `${p}\n\n${v}`, "");

        let embedReply = new EmbedBuilder()
          .setAuthor({ name: `All commands` })
          .setDescription(description);
        replyEmbedText(interaction, { embed: embedReply });
      } catch (e) {
        console.log(e);
        replyText(interaction, "Something went wrong");
      }
    });
  },
};
