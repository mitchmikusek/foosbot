import FoosbotCommand from "./FoosbotCommand.js";
import FoosballRankingService from "../../FoosballRanking"
import FoosbotUtils from "../Common/FoosbotUtils.js"

class PlayerUpdateCommand extends FoosbotCommand {
  constructor(context) {
    FoosbotUtils.botLog("Learning to Update Player data...");
    super();

    this.leagueToken = "league"
  }

  async execute(request, context) {
    FoosbotUtils.botLog("Updating Player Data");
    
    let args = request.event.text.split(" ");
    let updates = {id:null ,name:null, league:null }
    updates.id = request.event.user
    updates.name = await FoosbotUtils.getNameForId(request.event.user, context)
    args.indexOf(this.leagueToken) > -1 && (updates.league = args[args.indexOf(this.leagueToken)+1])
    await FoosballRankingService.updatePlayerData(updates)
    FoosbotUtils.respond("Updated Successfully", request)
  }
  
  getRealName(userId) {
    FoosbotUtils.botLog("Looking up user");

    return this.context.app.client.users.profile
      .get({
        token: this.context.botToken,
        user: userId
      })
      .then(response => response.profile.real_name);
  }
}

export default PlayerUpdateCommand;
