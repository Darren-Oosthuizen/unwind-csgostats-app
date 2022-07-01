import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {config} from "../config/config";
import {Observable} from "rxjs";
import {Dashboard} from "../models/Dashboard";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  _baseUrl: string;

  constructor(private _httpClient: HttpClient) {
    this._baseUrl = environment.API_BASE + config.endpoints.DASHBOARD;
  }

  public getDashboard(): Observable<Dashboard> {
    return this._httpClient.get(this._baseUrl + "/all") as Observable<Dashboard>;
  }
}
