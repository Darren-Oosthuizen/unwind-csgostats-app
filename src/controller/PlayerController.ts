import debug from "debug";
import PlayerApi from "../service/PlayerApi";

const log: debug.IDebugger = debug('app:player-controller');

class PlayerController {

    getTopPlayersByGunName(req: any, res: any, next: any) {
        PlayerApi.getTop5PlayersPerGun(req, res);
    }

    getPlayerBySteamID(req: any, res: any, next: any) {
        log(req.params);
        PlayerApi.getPlayerBySteamID(req, res);
    }

    getPlayerById(req: any, res: any, next: any) {
        PlayerApi.getPlayerByID(req, res);
    }

    getAllPlayers(req: any, res: any, next: any) {
        PlayerApi.getAllPlayers(req, res);
    }
}

export default new PlayerController();
