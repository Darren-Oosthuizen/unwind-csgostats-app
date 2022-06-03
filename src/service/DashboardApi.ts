import axios, {AxiosInstance} from 'axios';
import debug from "debug";
import {Game} from "../model/Game";

const log: debug.IDebugger = debug('app:dashboard-api');

class DashboardApi {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: "http://localhost:8080"
            // baseURL: "https://unwind-csgo-stats-api.herokuapp.com/"
        });
    }

    public getDashboard(req: any, res: any) {
        this.client.get("/api/v1/dashboard/all")
            .then((response: any) => {
                res.render('dashboard', {dashboard: response.data});
            })
            .catch((err) => {
                log(err);
                return err;
            });
    }

}

export default new DashboardApi();
