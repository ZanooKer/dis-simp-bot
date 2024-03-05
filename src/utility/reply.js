const { EmbedBuilder, CommandInteraction, Colors } = require("discord.js");

const getEmbedText = (
  { text, imageURL, iconURL, embed },
  color = "#0C1F6E"
) => {
  let embedReply = new EmbedBuilder();
  if (embed) {
    embedReply = embed;
    embed.setColor(color);
    return embedReply;
  }

  if (imageURL) {
    embedReply.setImage(imageURL).setColor(color);
    return embedReply;
  }
  embedReply.setAuthor({ name: text, iconURL }).setColor(color);
  return embedReply;
};

const replyEmbedText = (interaction, response, color = "#0C1F6E") => {
  let embedReply = getEmbedText(response, color);
  interaction.editReply({ embeds: [embedReply] });
};

const replyText = (interaction, text, ephemeral = true) => {
  interaction.editReply({ content: text, ephemeral });
};

module.exports = {
  getEmbedText,
  replyEmbedText,
  replyText,
};
