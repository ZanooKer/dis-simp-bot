const { useMainPlayer, useQueue } = require("discord-player");
const { replyText, replyEmbedText } = require("../../utility/reply");

module.exports = {
  name: "zclear",
  description: "clear all the music in the queue",
  voiceChannel: true,

  async execute({ interaction }) {
    const queue = useQueue(interaction.guild);
    const player = useMainPlayer();

    if (!queue || !queue.isPlaying())
      return replyText(interaction, "No music is currently playing");

    if (!queue.tracks.toArray()[1])
      return replyText(
        interaction,
        "No music in the queue after the current one"
      );

    await queue.tracks.clear();
    replyEmbedText(interaction, { text: "The queue has just been cleared" });
  },
};
