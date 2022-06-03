import axios, {AxiosInstance} from 'axios';
import debug from "debug";
import {Game} from "../model/Game";

const log: debug.IDebugger = debug('app:game-api');

class GameApi {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: "http://localhost:8080"
            // baseURL: "https://unwind-csgo-stats-api.herokuapp.com/"
        });
    }

    public getGames(req: any, res: any) {
        this.client.get("/api/v1/game/all")
            .then((response: any) => {
                res.render('matches', {matches: response.data});
            })
            .catch((err) => {
                log(err);
                return err;
            });
    }

    public getTeams(req: any, res: any) {
        this.client.get("/api/v1/teams/all")
            .then((response: any) => {
                res.render('teams', {teams: response.data});
            })
            .catch((err) => {
                log(err);
                return err;
            });
    }

    public getTeamByName(req: any, res: any) {
        this.client.get(encodeURI("/api/v1/teams/name/" + req.params.name))
            .then((response: any) => {
                res.render('team', {team: response.data});
            })
            .catch((err) => {
                log(err);
                return err;
            });
    }

    public getGameById(req: any, res: any) {
        this.client.get("/api/v1/game/id/" + req.params.id)
            .then((response: any) => {
                this.client.get("/api/v1/player/guns/game/id/" + req.params.id)
                    .then((guns: any) => {
                        res.render('match', {match: response.data, guns: guns.data});
                    })
                    .catch((err) => {
                        log(err);
                        return err;
                    });
            })
            .catch((err) => {
                log(err);
                return err;
            });
    }

    public createGame(game: Game) {
        this.client.post("/api/v1/game/create", game)
            .then((response: any) => {
                // Do something with the reponse?
        })
            .catch((err: any) => {
                // Note there was an issue, retry?
        })
    }

}

export default new GameApi();
