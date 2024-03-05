const { useMainPlayer, useQueue } = require("discord-player");
const { replyText, replyEmbedText } = require("../../utility/reply");

module.exports = {
  name: "zback",
  description: "Go back the song before",
  voiceChannel: true,

  async execute({ interaction }) {
    const player = useMainPlayer();

    const queue = useQueue(interaction.guild);
    if (!queue || !queue.node.isPlaying())
      return replyText(interaction, "No music is currently playing");

    if (!queue.history.previousTrack)
      return replyText(interaction, "There was no music played before");

    await queue.history.back();
    replyEmbedText(interaction, { text: "Playing the previous track ✅" });
  },
};
