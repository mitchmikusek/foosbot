import FoosbotCommand from "./FoosbotCommand.js";
import FoosballRankingService from "../../FoosballRanking"
import FoosbotUtils from "../Common/FoosbotUtils.js"
import cTable from "console.table";

class PrintStandingsCommand extends FoosbotCommand {
  constructor(context) {
    FoosbotUtils.botLog("Learning to print standings...");

    super();
    this.context = context
    this.leagueToken = "league"
    this.playerToken = "player"
    this.seasonToken = "season"
    this.overallToken = "overall"
  }

  parseArgs(args) {
    const tokens = args.split(" ");
    let query = { season: null, league: null, player: null, overall: false }
    tokens.indexOf(this.seasonToken) > -1 && (query.season = tokens[tokens.indexOf(this.seasonToken) + 1])
    tokens.indexOf(this.playerToken) > -1 && (query.player = tokens[tokens.indexOf(this.playerToken) + 1])
    tokens.indexOf(this.leagueToken) > -1 && (query.league = tokens[tokens.indexOf(this.leagueToken) + 1])
    tokens.indexOf(this.overallToken) > -1 && (query.overall = true)
    return query
  }

  async execute(request, context) {
    FoosbotUtils.botLog("Printing Standings");

    let query = this.parseArgs(request.event.text)
    if (query.overall && query.season !== null) {
      FoosbotUtils.respond("Can't request overall & season", request)
      return
    } else if (!query.overall && query.season === null) {
      query.season = (await FoosballRankingService.getCurrentSeason()).id
    }

    let players = await FoosballRankingService.getStandings(query);
    if (query.season !== null) players = players.filter(player => !!player.seasons[query.season])
    if (query.league !== null) players = players.filter(player => player.league === query.league)
    if (query.player !== null) {
      //TODO: grab and print a full single profile
      //If season query, show only it, or all seasons
    }
    if (players.length === 0) {FoosbotUtils.respond("Didn't find any standings", request); return;} 
    
    let table = ""
    if (query.season !== null)  {
      players.sort(this.eloSeasonSort(query.season));
      table = this.getSeasonStandingsTable(players, query.season);
    } else {
      players.sort(this.eloSort);
      table = this.getStandingsTable(players);
    }
    FoosbotUtils.respond(FoosbotUtils.preformatText(table), request, false)

  }

  getStandingsTable(players) {
    let tabledPlayerList = players.map((player, i) => {
      return {
        rank: i + 1,
        name: player.name || "unknown",
        W: player.ranking.wins,
        L: player.ranking.losses,
        ELO: player.ranking.elo.toFixed(1),
        streak: (player.ranking.streak > 0 ? "★" : "❄").repeat(Math.abs(player.ranking.streak))
      };
    });
    return cTable.getTable(tabledPlayerList);
  }

    getSeasonStandingsTable(players, seasonId) {
      let tabledPlayerList = players.map((player, i) => {
        return {
          rank: i + 1,
          name: player.name || "unknown",
          W: player.seasons[seasonId].wins,
          L: player.seasons[seasonId].losses,
          ELO: player.seasons[seasonId].elo.toFixed(1),
          streak: (player.seasons[seasonId].streak > 0 ? "★" : "❄").repeat(Math.abs(player.seasons[seasonId].streak))
        };
      });

    return cTable.getTable(tabledPlayerList);
  }

  eloSort(a, b) {
    return b.ranking.elo - a.ranking.elo;
  }

  eloSeasonSort(seasonId) {
    return (a,b) => { return b.seasons[seasonId].elo - a.seasons[seasonId].elo }
  }
}

export default PrintStandingsCommand;
