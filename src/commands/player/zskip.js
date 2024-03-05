const { useMainPlayer, useQueue } = require("discord-player");
const { replyText, replyEmbedText } = require("../../utility/reply");

module.exports = {
  name: "zskip",
  description: "skip the track",
  voiceChannel: true,

  execute({ interaction }) {
    const player = useMainPlayer();

    const queue = useQueue(interaction.guild);

    if (!queue || !queue.isPlaying())
      return replyText(interaction, "No music is currently playing");

    const success = queue.node.skip();
    if (success) {
      return replyEmbedText(interaction, {
        text: `Current music is skipped: ${queue.currentTrack.title} | ${queue.currentTrack.author} ✅`,
      });
    } else {
      return replyText(interaction, "Something went wrong");
    }
  },
};
