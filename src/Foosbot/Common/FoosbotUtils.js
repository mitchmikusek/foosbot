
class FoosbotUtils {

  static respond(message, request, inThread = true, markdown = true) {
    FoosbotUtils.botLog("Utilizing Vocal Systems...");

    let response = {}

    response.text = message
    if (inThread) response.thread_ts = request.event.ts
    if (markdown) response.type = "mrkdwn"

    request.say(response);
  }

  static botLog(message) {
    if (true) console.log(`🤖: ${message}`)
  }

  static getNameForId(userId, context) {
    FoosbotUtils.botLog("Looking up user");

    return context.app.client.users.profile
      .get({
        token: context.botToken,
        user: userId
      })
      .then(response => response.profile.real_name);
  }

  static preformatText(text) {
    return "```" + text + "```";
  }
}

export default FoosbotUtils