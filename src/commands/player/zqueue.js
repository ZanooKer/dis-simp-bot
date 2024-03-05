const { EmbedBuilder } = require("discord.js");
const { useMainPlayer, useQueue } = require("discord-player");
const { replyText, replyEmbedText } = require("../../utility/reply");

module.exports = {
  name: "zqueue",
  description: "Get the songs in the queue",
  voiceChannel: true,

  execute({ client, interaction }) {
    const player = useMainPlayer();

    const queue = useQueue(interaction.guild);

    if (!queue) return replyText(interaction, "No music is currently playing");
    if (!queue.tracks.toArray()[0])
      return replyText(
        interaction,
        "No music in the queue after the current one"
      );

    const songs = queue.tracks.size;

    const otherSongCountText =
      songs > 5 ? `And **${songs - 5}** other song(s)...` : "";

    const tracks = queue.tracks.map(
      (track, i) =>
        `**${i + 1}** - ${track.title} | ${track.author} (requested by : ${
          track.requestedBy.username
        })`
    );

    return replyEmbedText(interaction, {
      embed: new EmbedBuilder()
        .setThumbnail(interaction.guild.iconURL({ size: 2048, dynamic: true }))
        .setAuthor({
          name: `Server queue - ${interaction.guild.name}`,
          iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }),
        })
        .setDescription(
          `Current\n${queue.currentTrack.title} | ${
            queue.currentTrack.author
          }\n\nQueue\n${tracks.slice(0, 5).join("\n")}\n\n${otherSongCountText}`
        )
        .setTimestamp(),
    });
  },
};
