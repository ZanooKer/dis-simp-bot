const { ApplicationCommandOptionType } = require("discord.js");
const { useMainPlayer, useQueue } = require("discord-player");
const { replyText, replyEmbedText } = require("../../utility/reply");

module.exports = {
  name: "zremove",
  description: "remove a song from the queue",
  voiceChannel: true,
  options: [
    {
      name: "song",
      description: "the name/url of the track you want to remove",
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

    const number = interaction.options.getNumber("number");
    const track = interaction.options.getString("song");

    const queue = useQueue(interaction.guild);

    if (!queue || !queue.isPlaying())
      return replyText(interaction, "No music is currently playing");
    if (!track && !number)
      return replyText(
        interaction,
        "You have to use one of the options to remove a song"
      );

    if (track) {
      const track_to_remove = queue.tracks
        .toArray()
        .find((t) => t.title === track || t.url === track);
      if (!track_to_remove)
        return replyText(interaction, `Could not find ${track}`);
      queue.removeTrack(track_to_remove);
      return replyEmbedText(interaction, {
        text: `Removed from the queue: ${track_to_remove.title} | ${track_to_remove.author}  ✅`,
      });
    }

    if (number) {
      const index = number - 1;
      const trackName = queue.tracks.toArray()[index].title;
      const author = queue.tracks.toArray()[index].author;

      if (!trackName)
        return replyText(interaction, "This track dose not seem to exist");

      queue.removeTrack(index);
      return replyEmbedText(interaction, {
        text: `Removed from the queue: ${trackName} | ${author} ✅`,
      });
    }
  },
};
