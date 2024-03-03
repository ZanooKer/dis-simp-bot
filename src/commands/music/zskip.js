const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  name: "zskip",
  description: "Skip current track",
  execute(bot, interaction, queue) {
    if (queue.size < 1 && queue.repeatMode !== 3)
      return bot.say.errorEmbed(interaction, "The queue has no more track.");

    queue.node.skip();

    return bot.say.successEmbed(interaction, "Skipped the current track.");
  },
};
