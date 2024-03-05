const { useMainPlayer, useQueue } = require("discord-player");
const { replyText, replyEmbedText } = require("../../utility/reply");

module.exports = {
  name: "zresume",
  description: "play the track",
  voiceChannel: true,

  execute({ interaction }) {
    const player = useMainPlayer();

    const queue = useQueue(interaction.guild);

    if (!queue) return replyText(interaction, "No music is currently playing");

    if (queue.node.isPlaying())
      return replyText(interaction, "The track is already running");

    const success = queue.node.resume();
    if (success) {
      return replyEmbedText(interaction, {
        text: `Current music is resumed: ${queue.currentTrack.title} | ${queue.currentTrack.author} ✅`,
      });
    } else {
      return replyText(interaction, "Something went wrong");
    }
  },
};
