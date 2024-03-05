const { getEmbedText } = require("../../utility/reply");

module.exports = (queue, error) => {
  console.log(`Error emitted from the Bot ${error.message}`);
  queue.metadata.send({
    embeds: [
      getEmbedText(
        {
          text: "Bot had an unexpected error!",
          iconURL: track.thumbnail,
        },
        "#EE4B2B"
      ),
    ],
  });
};
