import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {config} from "../config/config";
import {Observable} from "rxjs";
import {Game} from "../models/Game";

@Injectable({
    providedIn: 'root'
})
export class GameService {

    _baseUrl: string;

    constructor(private _httpClient: HttpClient) {
        this._baseUrl = environment.API_BASE + config.endpoints.GAME;
    }

    public getGameById(id: any): Observable<any> {
        return this._httpClient.get(this._baseUrl + "/id/" + id) as Observable<any>;
    }

    public getGunsByGameId(id: any): Observable<any> {
        return this._httpClient.get(environment.API_BASE + config.endpoints.PLAYERS + "/guns/game/id/" + id) as Observable<any>;
    }

    public getAllGuns(): Observable<any> {
        return this._httpClient.get(environment.API_BASE + config.endpoints.PLAYERS + "/guns/all") as Observable<any>;
    }

    public createGame(game: Game): Observable<any> {
        return this._httpClient.post(environment.API_BASE + config.endpoints.GAME + "/create", game);
    }

    public validateGameDuels(): Observable<any> {
        return this._httpClient.get(environment.API_BASE + config.endpoints.TEST + "/validate/game/duel");
    }

    public validateGameWins(): Observable<any> {
        return this._httpClient.get(environment.API_BASE + config.endpoints.TEST + "/validate/game/wins");
    }

    public validateTeamDamage(): Observable<any> {
        return this._httpClient.get(environment.API_BASE + config.endpoints.TEST + "/validate/team/damage");
    }

    public validateTeams(): Observable<any> {
        return this._httpClient.get(environment.API_BASE + config.endpoints.TEST + "/validate/player/teams");
    }

    public validateGameCutches(id: any): Observable<any> {
        return this._httpClient.get(environment.API_BASE + config.endpoints.TEST + "/validate/clutch/game/id/" + id);
    }

    public validateKnifeKills(): Observable<any> {
        return this._httpClient.get(environment.API_BASE + config.endpoints.TEST + "/validate/knife/kills");
    }
}
