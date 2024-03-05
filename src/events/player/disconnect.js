const { getEmbedText } = require("../../utility/reply");

module.exports = (queue) => {
  queue.metadata.send({
    embeds: [
      getEmbedText(
        {
          text: "Disconnected from the voice channel. The queue is now cleared.",
        },
        "#2f3136"
      ),
    ],
  });
};
