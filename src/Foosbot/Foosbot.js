import { App } from "@slack/bolt";
import FoosbotUtils from "./Common/FoosbotUtils.js"
import PrintStandingsCommand from "./Commands/PrintStandingsCommand.js";
import RecordGameCommand from "./Commands/RecordGameCommand.js";
import PlayerUpdateCommand from "./Commands/PlayerUpdateCommand"

class Foosbot {
  constructor(btoken, signingSecret, port = 3000, channels = []) {
    FoosbotUtils.botLog("Constructing Self...");

    // Construct app and store botId
    this.app = new App({ token: btoken, signingSecret: signingSecret });
    this.botToken = btoken;
    this.channels = channels;
    this.port = port;

    this.commands = this.mapCommands()

    // Method Binding
    this.respondToName = this.respondToName.bind(this)

    // Initialize any other items necessary 
    this.init()
  }

  mapCommands() {
    FoosbotUtils.botLog("Defining Command Modules...")
    let commands = new Map()

    commands.set("standings", new PrintStandingsCommand(this))
    commands.set("update", new PlayerUpdateCommand(this))
    commands.set("record", new RecordGameCommand(this))

    return commands
  }

  init() {
    FoosbotUtils.botLog("Initializing subsystems...")

    // Setup Listener for request to bot directly
    FoosbotUtils.botLog("Setting up listeners...")
    this.app.event("app_mention", this.respondToName)
  }

  respondToName(request) {
    FoosbotUtils.botLog("I heard my name!")

    if (this.channels.includes(request.event.channel)) {
      this.runCommand(request)
    } else {
      FoosbotUtils.respond("I'm not authorized to operate here :(", request)
    }
  }

  runCommand(request) {
    FoosbotUtils.botLog("Running Requested Command...");

    let args = request.event.text.split(" ").filter( token => token !== '')
    let command = args[1] || null;

    if (this.commands.has(command)) {
      this.commands.get(command).execute(request, this);
    } else {
      FoosbotUtils.botLog(`${command} is an invalid operation`)

      FoosbotUtils.respond(`Sorry, I haven't learned how to ${command} yet.`, request)
    }
  }

  start() {
    FoosbotUtils.botLog("All Systems Go...")

    return this.app.start(this.port);
  }
}

export default Foosbot;

