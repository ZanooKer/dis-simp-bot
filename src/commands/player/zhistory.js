const { EmbedBuilder } = require("discord.js");
const { useMainPlayer, useQueue } = require("discord-player");
const { replyText, replyEmbedText } = require("../../utility/reply");

module.exports = {
  name: "zhistory",
  description: "See the history of the queue",
  voiceChannel: false,

  async execute({ interaction }) {
    const queue = useQueue(interaction.guild);
    const player = useMainPlayer();

    if (!queue || queue.history.tracks.toArray().length == 0)
      return replyText(interaction, "No any music history");

    const tracks = queue.history.tracks.toArray();
    let description = tracks
      .slice(0, 20)
      .map((track, index) => {
        return `**${index + 1}.** [${track.title}](${track.url}) | ${
          track.author
        }`;
      })
      .join("\r\n\r\n");

    replyEmbedText(interaction, {
      embed: new EmbedBuilder()
        .setTitle("History")
        .setDescription(description)
        .setTimestamp(),
    });
  },
};
