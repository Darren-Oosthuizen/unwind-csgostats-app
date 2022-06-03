import debug from "debug";
import GameApi from "../service/GameApi";

const log: debug.IDebugger = debug('app:game-controller');

class GameController {

    getMatches(req: any, res: any, next: any) {
        log("Fetching all matches")
        GameApi.getGames(req, res);
    }

    getTeams(req: any, res: any, next: any) {
        log("Fetching all Teams")
        GameApi.getTeams(req, res);
    }

    getTeamByName(req: any, res: any, next: any) {
        log("Fetching Team with name: " + req.params.name)
        GameApi.getTeamByName(req, res);
    }

    getMatchById(req: any, res: any, next: any) {
        log("Fetching Match with ID: " + req.params.id)
        GameApi.getGameById(req, res);
    }
}

export default new GameController();
