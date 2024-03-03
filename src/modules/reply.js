// eslint-disable-next-line no-unused-vars
const { EmbedBuilder, CommandInteraction, Colors } = require("discord.js");

/**
 * Send text success message back to client
 * @param {*} interaction client interaction property
 * @param {*} text
 * @param {*} ephemeral
 * @returns
 */
function successEmbed(interaction, text, ephemeral = false) {
  if (!interaction) {
    throw Error("'interaction' must be passed down as param! (successEmbed)");
  }

  if (!text) {
    throw Error("'text' must be passed down as param! (successEmbed)");
  }

  const sEmbed = new EmbedBuilder()
    .setDescription(text)
    .setColor(interaction.guild.members.me.displayColor || Colors.Fuchsia);

  if (interaction.deferred) {
    return interaction.editReply({ embeds: [sEmbed] }).catch(console.error);
  }

  if (interaction.replied) {
    return interaction
      .followUp({ ephemeral, embeds: [sEmbed] })
      .catch(console.error);
  }

  return interaction
    .reply({ ephemeral, embeds: [sEmbed] })
    .catch(console.error);
}

function successImageEmbed(interaction, imageURL, ephemeral = false) {
  if (!interaction) {
    throw Error(
      "'interaction' must be passed down as param! (successImageEmbed)"
    );
  }

  if (!imageURL) {
    throw Error("'text' must be passed down as param! (successImageEmbed)");
  }

  const sEmbed = new EmbedBuilder()
    .setImage(imageURL)
    .setColor(interaction.guild.members.me.displayColor || Colors.Fuchsia);

  if (interaction.deferred) {
    return interaction.editReply({ embeds: [sEmbed] }).catch(console.error);
  }

  if (interaction.replied) {
    return interaction
      .followUp({ ephemeral, embeds: [sEmbed] })
      .catch(console.error);
  }

  return interaction
    .reply({ ephemeral, embeds: [sEmbed] })
    .catch(console.error);
}

function wrongEmbed(interaction, text) {
  if (!interaction) {
    throw Error("'interaction' must be passed down as param! (wrongEmbed)");
  }

  if (!text) {
    throw Error("'text' must be passed down as param! (wrongEmbed)");
  }

  const wEmbed = new EmbedBuilder()
    .setDescription(text)
    .setColor(Colors.Orange);

  if (interaction.deferred) {
    return interaction.editReply({ embeds: [wEmbed] }).catch(console.error);
  }

  if (interaction.replied) {
    return interaction
      .followUp({ ephemeral: true, embeds: [wEmbed] })
      .catch(console.error);
  }

  return interaction
    .reply({ ephemeral: true, embeds: [wEmbed] })
    .catch(console.error);
}

function errorEmbed(interaction, text) {
  if (!interaction) {
    throw Error("'interaction' must be passed down as param! (errorEmbed)");
  }

  if (!text) {
    throw Error("'text' must be passed down as param! (errorEmbed)");
  }

  const eEmbed = new EmbedBuilder().setDescription(text).setColor(Colors.Red);

  if (interaction.deferred) {
    return interaction.editReply({ embeds: [eEmbed] }).catch(console.error);
  }

  if (interaction.replied) {
    return interaction
      .followUp({ ephemeral: true, embeds: [eEmbed] })
      .catch(console.error);
  }

  return interaction
    .reply({ ephemeral: true, embeds: [eEmbed] })
    .catch(console.error);
}

async function queueEmbed(queue, text) {
  if (!queue) {
    throw Error("'queue' must be passed down as param! (queueEmbed)");
  }

  if (!text) {
    throw Error("'text' must be passed down as param! (queueEmbed)");
  }

  const channel = queue.metadata;
  const { havePermissions } = require("./utils");
  if (!havePermissions(channel)) return;

  const embedQ = new EmbedBuilder()
    .setDescription(text)
    .setColor(queue.guild.members.me.displayColor || Colors.Fuchsia);

  return channel.send({ embeds: [embedQ] });
}

module.exports = {
  errorEmbed,
  wrongEmbed,
  successEmbed,
  successImageEmbed,
  queueEmbed,
};
