const { getEmbedText } = require("../../utility/reply");

module.exports = (queue) => {
  queue.metadata.send({
    embeds: [getEmbedText({ text: "No more songs in the queue!" }, "#2f3136")],
  });
};
