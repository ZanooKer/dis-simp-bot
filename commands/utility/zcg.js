const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const client = require("nekos.life");

const nekoClient = new client();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("zcg")
    .setDescription("praise the cat girl"),
  async execute(interaction) {
    const a = await nekoClient.neko();
    const image = new AttachmentBuilder(a.url, { name: "cg.png" });
    await interaction.reply({ message: "", files: [image] });
  },
};
