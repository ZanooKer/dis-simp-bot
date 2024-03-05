const { ApplicationCommandOptionType } = require("discord.js");
const { useMainPlayer, useQueue } = require("discord-player");
const config = require("../../../config.json");
const { replyText, replyEmbedText } = require("../../utility/reply");

module.exports = {
  name: "zvolume",
  description: "Adjust volume",
  voiceChannel: true,
  options: [
    {
      name: "volume",
      description: "The amount volume",
      type: ApplicationCommandOptionType.Number,
      required: true,
      minValue: 1,
      maxValue: config.opt.maxVol,
    },
  ],

  execute({ interaction }) {
    const player = useMainPlayer();

    const queue = useQueue(interaction.guild);

    if (!queue) return replyText(interaction, "No music currently playing");

    const vol = interaction.options.getNumber("volume");
    if (queue.node.volume === vol)
      return replyText(
        interaction,
        "The volume you want to change is already the current one"
      );

    console.log(vol);

    const success = queue.node.setVolume(vol);
    if (success) {
      return replyEmbedText(interaction, {
        text: `The volume has been modified to ${vol}/${config.opt.maxVol}% 🔊`,
      });
    } else {
      return replyText(interaction, "Something went wrong");
    }
  },
};
