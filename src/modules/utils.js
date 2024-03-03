const DJS = require("discord.js");

function baseEmbed(resolvable) {
  let colour = DJS.Colors.Fuchsia;

  if (resolvable && typeof resolvable === "number") colour = resolvable;
  if (resolvable && typeof resolvable === "object")
    colour =
      ("guild" in resolvable ? resolvable.guild : resolvable)?.members.me
        .displayColor || DJS.Colors.Fuchsia;

  return new DJS.EmbedBuilder().setColor(colour);
}

module.exports = {
  baseEmbed,
};
