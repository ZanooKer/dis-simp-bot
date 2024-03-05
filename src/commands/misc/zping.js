const { replyEmbedText } = require("../../utility/reply");

module.exports = {
  name: "zping",
  description: "Check bot if it is alive",
  async execute(interaction) {
    replyEmbedText(interaction, { text: "Pong!" });
  },
};
