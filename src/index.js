import Foosbot from './Foosbot';

(async () => {
  
  // Get Args to build bot
  let data_store = process.env.FOOSBOT_STORE                                          // Prefix for Data Store

  let app_channel = process.env.SLACK_APP                                             // Channel for the bot's app
  let signingSecret = process.env.SLACK_SIGNING_SECRET                                // Slack Secret Token
  let btoken = process.env.SLACK_BOT_TOKEN                                            // Slack bot Token
  
  let port = process.env.PORT || 3000                                                 // Port to listen on
  let channels = process.env.SLACK_CHANNELS && process.env.SLACK_CHANNELS.split(',')  // Channel for the bot to operate in
  
  console.log("Env Vars", data_store, app_channel, signingSecret, btoken, port, channels)

  // Build the bot
  let foosbot = new Foosbot(btoken, signingSecret, port, channels);
  
  // Turn the bot on
  await foosbot.start();

  // Notify that we're running
  console.log('⚡️ Bolt app is running!');
})();