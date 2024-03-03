const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("zping")
    .setDescription("Check bot if it is alive"),
  async execute(interaction) {
    await interaction.reply("Pong!");
  },
};
