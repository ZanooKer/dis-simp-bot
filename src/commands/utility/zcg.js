const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const client = require("nekos.life");

const nekoClient = new client();

module.exports = {
  name: "zcg",
  description: "Praise the cat girl",
  async execute(bot, interaction) {
    console.log("EXE");
    const a = await nekoClient.neko();
    return bot.say.successImageEmbed(interaction, a.url);
  },
};
