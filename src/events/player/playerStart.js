const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require("discord.js");
const config = require("../../../config.json");
const { getEmbedText } = require("../../utility/reply");

module.exports = (queue, track) => {
  queue.metadata.send({
    embeds: [
      getEmbedText(
        {
          text: `Started playing ${track.title} | ${track.author} in ${queue.channel.name}.\n`,
          iconURL: track.thumbnail,
        },
        "#2f3136"
      ),
    ],
  });
};
