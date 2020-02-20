import FoosbotCommand from "./FoosbotCommand.js";
import FoosbotUtils from "../Common/FoosbotUtils.js";
import FoosballRankingService from "../../FoosballRanking"


class RecordGameCommand extends FoosbotCommand {
  constructor(context) {
    FoosbotUtils.botLog("Learning to record games...");

    super();
    this.context = context
    this.winToken = ":goat:"
    this.lossToken = ":whale:"
    this.winnerInitial = "g"
    this.loserInitial = "w"
    this.seriesToken = "series"
  }

  parseCommand(reporter, commandString, winToken, lossToken, seriesToken) {
    FoosbotUtils.botLog("Parsing Command...");
    let rawMatch = {
      winners: [],
      losers: [],
      reporter: reporter,
      series: ['g']
    }

    let args = commandString.split(" ").filter( token=> token !== '')
    let commandStack = []
    for (let i = 2; i < args.length; i++) {
      let token = args[i];

      if(token === winToken && !commandStack.includes("winners")){
        commandStack.unshift("winners")
      } else if (token === lossToken && !commandStack.includes("losers")){
        commandStack.unshift("losers")
      } else if (token === seriesToken && !commandStack.includes("series")){
        commandStack.unshift("series")
        rawMatch.series = args[++i].toLowerCase().split('')
      } else if (/^<@\w*>$/g.test(token)) {
        let recordingWinners =  ['winners', 'losers'].includes(commandStack[0]) ? commandStack[0] === "winners" : null;
        
        if(recordingWinners === null){
          return null
        } else {
          recordingWinners
          ? rawMatch.winners.push(token.substring(2, token.length - 1))
          : rawMatch.losers.push(token.substring(2, token.length - 1))
        }
        
      } else {
        return null
      }
    }
    return rawMatch;
  }

  async execute(request, context) {
    FoosbotUtils.botLog("Recording Match");

    let rawMatch = this.parseCommand(request.event.user, request.event.text, this.winToken, this.lossToken, this.seriesToken);
 
    if(rawMatch === null){
      FoosbotUtils.botLog("Invalid Token Found");
      FoosbotUtils.respond("Invalid Command Format", request);
    } else if (rawMatch.winners.length == 0 || rawMatch.losers.length == 0) {
      FoosbotUtils.botLog("Missing Winnners or Losers");
      FoosbotUtils.respond("Missing Winners or Losers, Invalid Game.", request);
    } else if (rawMatch.winners.filter(value => rawMatch.losers.includes(value)).length != 0) {
      FoosbotUtils.botLog("Playing for both sides");
      FoosbotUtils.respond("Can't have people playing for both sides, Invalid Game", request);
    } else if (rawMatch.series.filter(match => match !== 'g' && match !== 'w' ).length > 0){
      FoosbotUtils.botLog("Invalid Series Definition");
      FoosbotUtils.respond("Series wasn't described correctly, ignoring request.", request);
    } else {
      FoosbotUtils.botLog("Game Legit, recording");

      let series = []
      const winnerMatchDto = await this.createMatchDto(rawMatch.winners, rawMatch.losers, rawMatch.reporter)
      
      for(let winner of rawMatch.series){
        let matchDto = {}

        if(winner == this.winnerInitial){
          matchDto = winnerMatchDto
        }else if(winner === this.loserInitial){
          matchDto.winners = winnerMatchDto.losers
          matchDto.losers = winnerMatchDto.winners
          matchDto.reporter = winnerMatchDto.reporter
        }        
        let match = await FoosballRankingService.recordMatch(matchDto);
        series.push(match)
      }

      FoosbotUtils.respond(this.prettyPrintSeries(series), request);
    }
  }

  async createMatchDto(winnerIds, loserIds, reporter) {
    let match = {winners: [], losers:[], reporter:null}

    for (let player of winnerIds){
      let name = await FoosbotUtils.getNameForId(player, this.context)
      match.winners.push({id:player, name:name})
    }

    for (let player of loserIds){
      let name = await FoosbotUtils.getNameForId(player, this.context)
      match.losers.push({id:player, name:name})
    }

    let name = await FoosbotUtils.getNameForId(reporter, this.context)
    match.reporter = {id:reporter, name:name}

    return match
  }

  prettyPrintSeries(series) {
    return series.map(match => this.prettyPrintMatch(match)).join("\n\n");
  }

  prettyPrintMatch(match) {
    return (
      "```" +
      `Match Id: ${match.id}\n` +
      `Recorded: ${new Date(match.date).toISOString().slice(0, 10)}\n` +
      `-------------------------------\n` +
      `Winners (Avg Rating: ${match.winnerRaiting.toFixed(1)}):\n` +
      match.winner.players.map(player => `${player.name} (${(player.seasons[match.season.id].elo - match.change).toFixed(1)}+${match.change.toFixed(1)})`).join("\n") +

      `\n\nLosers (Avg Rating: ${match.loserRaiting.toFixed(1)}):\n` +
      match.loser.players.map(player => `${player.name} (${(player.seasons[match.season.id].elo + match.change).toFixed(1)}-${match.change.toFixed(1)})`).join("\n") +
      "```"
    );
  }
}

export default RecordGameCommand;
