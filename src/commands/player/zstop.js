const { useMainPlayer, useQueue } = require("discord-player");
const { replyText, replyEmbedText } = require("../../utility/reply");

module.exports = {
  name: "zstop",
  description: "stop the track",
  voiceChannel: true,

  execute({ interaction }) {
    const player = useMainPlayer();

    const queue = useQueue(interaction.guild);

    if (!queue || !queue.isPlaying())
      return replyText(interaction, "No music is currently playing");

    queue.delete();
    return replyEmbedText(interaction, {
      text: "Music is stopped",
    });
  },
};
