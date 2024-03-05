const { getEmbedText } = require("../../utility/reply");

module.exports = (queue) => {
  queue.metadata.send({
    embeds: [
      getEmbedText(
        {
          text: "Nobody is in the voice channel, leaving the channel",
        },
        "#2f3136"
      ),
    ],
  });
};
