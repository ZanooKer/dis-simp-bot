const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  name: "zstop",
  description: "Stop the playback.",
  async execute(bot, interaction, queue) {
    queue.delete();

    return bot.say.successEmbed(interaction, "Stopped the playback.");
  },
};
