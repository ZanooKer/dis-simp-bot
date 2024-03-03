const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  name: "zresume",
  description: "Resume the playback",
  execute(bot, interaction, queue) {
    if (queue.node.isPlaying())
      return bot.say.wrongEmbed(
        interaction,
        "The playback is already playing."
      );

    queue.node.resume();

    return bot.say.successEmbed(interaction, "Resumed the playback.");
  },
};
