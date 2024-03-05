const { ApplicationCommandOptionType } = require("discord.js");
const { useMainPlayer, useQueue } = require("discord-player");
const { replyText, replyEmbedText } = require("../../utility/reply");

module.exports = {
  name: "zjump",
  description: "Jumps to particular track in queue",
  voiceChannel: true,
  options: [
    {
      name: "song",
      description: "the name/url of the track you want to jump to",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: "number",
      description: "the place in the queue the song is in",
      type: ApplicationCommandOptionType.Number,
      required: false,
    },
  ],

  async execute({ interaction }) {
    const player = useMainPlayer();

    const track = interaction.options.getString("song");
    const number = interaction.options.getNumber("number");

    const queue = useQueue(interaction.guild);

    if (!queue || !queue.isPlaying())
      return replyText("No music is currently playing");
    if (!track && !number)
      return replyText("You have to use one of the options to jump to a song");

    if (track) {
      const jumpToTrack = queue.tracks
        .toArray()
        .find((t) => t.title.toLowerCase().includes(track.toLowerCase()));
      if (!jumpToTrack)
        return replyText(interaction, `Could not find ${track}`);
      queue.node.jump(jumpToTrack);
      return replyEmbedText(interaction, {
        text: `Jump to ${jumpToTrack.title} | ${jumpToTrack.author} ✅`,
      });
    }
    if (number) {
      const index = number - 1;
      const trackName = queue.tracks.toArray()[index].title;
      const author = queue.tracks.toArray()[index].author;
      if (!trackName)
        return replyText(interaction, "This track dose not seem to exist");
      queue.node.jump(index);
      return replyEmbedText(interaction, {
        text: `Jump to ${trackName} | ${author} ✅`,
      });
    }
  },
};
