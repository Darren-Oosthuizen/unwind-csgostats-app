import axios, {AxiosInstance} from 'axios';
import debug from "debug";
import {Game} from "../model/Game";

const log: debug.IDebugger = debug('app:player-api');

class PlayerApi {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: "http://localhost:8080"
            // baseURL: "https://unwind-csgo-stats-api.herokuapp.com/"
        });
    }

    public getTop5PlayersPerGun(req : any, res: any): any {
        this.client.get("/api/v1/player/guns/all")
            .then((response: any) => {
                res.render('guns', {guns: response.data});
            })
            .catch((err) => {
                log(err);
                return err;
            });
    }

    public getAllPlayers(req : any, res: any): any {
        this.client.get("/api/v1/player/all")
            .then((response: any) => {
                res.render('players', {players: response.data});
            })
            .catch((err) => {
                log(err);
                return err;
            });
    }

    public getPlayerBySteamID(req : any, res: any): any {
        this.client.get("/api/v1/player/steamID/" + req.params.steamid)
            .then((response: any) => {
                log(response.data);
                res.render('player', {player: response.data});
            })
            .catch((err) => {
                log(err);
                return err;
            });
    }

    public getPlayerByID(req : any, res: any): any {
        this.client.get("/api/v1/player/id/" + req.params.id)
            .then((response: any) => {
                log(response.data);
                res.render('player', {player: response.data});
            })
            .catch((err) => {
                log(err);
                return err;
            });
    }

    public getPlayerGamesById(id: string): any {
        this.client.get("/api/v1/player/" + id + "/games")
            .then((response: any) => {
                log(response.data);
                return response.data;
            })
            .catch((err) => {
                log(err);
                return err;
            });
    }

    public createGame(game: Game) {
        this.client.post("/api/v1/game/create", game)
            .then((response: any) => {
                // Do something with the response?
            })
            .catch((err: any) => {
                // Note there was an issue, retry?
            })
    }

}

export default new PlayerApi();
