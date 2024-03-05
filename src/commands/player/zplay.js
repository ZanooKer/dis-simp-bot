const config = require("../../../config.json");
const { QueryType, useMainPlayer } = require("discord-player");
const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const { replyEmbedText } = require("../../utility/reply");

module.exports = {
  name: "zplay",
  description: "play a song!",
  voiceChannel: true,
  options: [
    {
      name: "song",
      description: "the song you want to play",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  async execute({ interaction, client }) {
    const player = useMainPlayer();

    const song = interaction.options.getString("song");
    const res = await player.search(song, {
      requestedBy: interaction.member,
      searchEngine: QueryType.AUTO,
    });

    if (!res || !res.tracks.length)
      return replyText(interaction, "No results found");

    const queue = await player.nodes.create(interaction.guild, {
      metadata: interaction.channel,
      spotifyBridge: config.opt.spotifyBridge,
      volume: config.opt.volume,
      leaveOnEmpty: config.opt.leaveOnEmpty,
      leaveOnEmptyCooldown: config.opt.leaveOnEmptyCooldown,
      leaveOnEnd: config.opt.leaveOnEnd,
      leaveOnEndCooldown: config.opt.leaveOnEndCooldown,
    });

    try {
      if (!queue.connection)
        await queue.connect(interaction.member.voice.channel);
    } catch {
      await player.deleteQueue(interaction.guildId);
      return replyText(interaction, "The bot can't join the voice channel");
    }

    res.playlist ? queue.addTrack(res.tracks) : queue.addTrack(res.tracks[0]);

    let trackListText = "";
    if (res.playlist) {
      trackListText += res.tracks
        .map((track, index) => `${index + 1}: ${track.title} | ${track.author}`)
        .reduce((p, v) => `${p}\n${v}`, "");
    } else {
      trackListText += `${res.tracks[0].title} | ${res.tracks[0].author}`;
    }
    await replyEmbedText(interaction, {
      embed: new EmbedBuilder()
        .setAuthor({
          name: "Loading this song(s) to the queue ✅",
        })
        .setDescription(trackListText),
    });

    if (!queue.isPlaying()) await queue.node.play();
  },
};
