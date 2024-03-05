const config = require("../../../config.json");

module.exports = async (client) => {
  console.log(
    `Logged to the client ${client.user.username}\n The bot is now ready.`
  );
  client.user.setActivity(config.app.botActivity);
};
