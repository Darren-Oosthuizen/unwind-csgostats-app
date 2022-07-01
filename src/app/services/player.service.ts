import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {config} from "../config/config";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PlayerService {

    _baseUrl: string;

    constructor(private _httpClient: HttpClient) {
        this._baseUrl = environment.API_BASE + config.endpoints.PLAYERS;
    }

    public getPlayers(): Observable<any> {
        return this._httpClient.get(this._baseUrl + "/all") as Observable<any>;
    }

    public getPlayer(id: number): Observable<any> {
        return this._httpClient.get(this._baseUrl + "/id/" + id) as Observable<any>;
    }
}
