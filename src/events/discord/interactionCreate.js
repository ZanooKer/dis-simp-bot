const { EmbedBuilder, InteractionType } = require("discord.js");
const { replyEmbedText } = require("../../utility/reply");

module.exports = async (client, interaction) => {
  await interaction.deferReply();
  if (interaction.type === InteractionType.ApplicationCommand) {
    const command = client.commands.get(interaction.commandName);

    if (!command) {
      client.slash.delete(interaction.commandName);
      return replyEmbedText(interaction, { text: "Error!" }, "#ff0000");
    }
    if (
      command.permissions &&
      !interaction.member.permissions.has(command.permissions)
    )
      return replyEmbedText(
        interaction,
        { text: "This bot does not have permission to use this command!" },
        "#ff0000"
      );

    if (command.voiceChannel) {
      if (!interaction.member.voice.channel)
        return replyEmbedText(
          interaction,
          { text: "You are not in a Voice Channel" },
          "#FF0000"
        );

      if (
        interaction.guild.members.me.voice.channel &&
        interaction.member.voice.channel.id !==
          interaction.guild.members.me.voice.channel.id
      )
        return replyEmbedText(
          interaction,
          { text: "You are not in the same Voice Channel" },
          "#FF0000"
        );
    }
    command.execute({ interaction, client });
  }
};
