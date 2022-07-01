import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {config} from "../config/config";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TeamsService {

    _baseUrl: string;

    constructor(private _httpClient: HttpClient) {
        this._baseUrl = environment.API_BASE + config.endpoints.TEAMS;
    }

    public getTeams(): Observable<any> {
        return this._httpClient.get(this._baseUrl + "/all") as Observable<any>;
    }

    public getTeamByName(name: string): Observable<any> {
        return this._httpClient.get(encodeURI(this._baseUrl + "/name/" + name)) as Observable<any>;
    }
}
