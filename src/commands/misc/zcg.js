const client = require("nekos.life");
const { replyEmbedText } = require("../../utility/reply");

const nekoClient = new client();

module.exports = {
  name: "zcg",
  description: "Praise the cat girl",
  async execute({ interaction }) {
    try {
      const a = await nekoClient.neko();
      replyEmbedText(interaction, { imageURL: a.url });
    } catch (e) {
      console.log(e);
      replyText(interaction, "Cannot fetch cat girl");
    }
  },
};
