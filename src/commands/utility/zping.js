const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  name: "zping",
  description: "Ping server",
  async execute(bot, interaction) {
    return bot.say.successEmbed(interaction, "Pong!");
  },
};
