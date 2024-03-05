const { getEmbedText } = require("../../utility/reply");

module.exports = (queue, track) => {
  queue.metadata.send({
    embeds: [
      getEmbedText(
        {
          text: `Skipping **${track.title} | ${track.author}**  `,
          iconURL: track.thumbnail,
        },
        "#2f3136"
      ),
    ],
  });
};
