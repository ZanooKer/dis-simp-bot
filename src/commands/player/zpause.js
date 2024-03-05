const { useMainPlayer, useQueue } = require("discord-player");
const { replyText, replyEmbedText } = require("../../utility/reply");

module.exports = {
  name: "zpause",
  description: "pause the track",
  voiceChannel: true,

  execute({ interaction }) {
    const queue = useQueue(interaction.guild);
    const player = useMainPlayer();

    if (!queue) return replyText(interaction, "No music is currently playing");

    if (queue.node.isPaused())
      return replyText(interaction, "The track is currently paused");

    const success = queue.node.setPaused(true);

    if (success) {
      return replyEmbedText(interaction, {
        text: `Current music is paused: ${queue.currentTrack.title} | ${queue.currentTrack.author} ✅`,
      });
    } else {
      return replyText(interaction, "Something went wrong");
    }
  },
};
