import {CommonRoutesConfig} from './routes.config';
import express from 'express';
import AppController from "../controller/AppController";
import PlayerController from "../controller/PlayerController";
import GameController from "../controller/GameController";
import DashboardController from "../controller/DashboardController";

export class PlayerRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'PlayerRoutes');
    }

    configureRoutes(): express.Application {
        this.app.route(`/`)
            .get(AppController.getStats);

        this.app.route(`/dashboard`)
            .get(DashboardController.getDashboard);

        this.app.route(`/players`)
            .get(PlayerController.getAllPlayers);

        this.app.route(`/matches`)
            .get(GameController.getMatches);

        this.app.route(`/teams`)
            .get(GameController.getTeams);

        this.app.route('/upload-demo')
            .post(AppController.uploadDemo);

        this.app.route('/player/:id/')
            .get(PlayerController.getPlayerById)

        this.app.route('/match/:id/')
            .get(GameController.getMatchById)

        this.app.route('/team/:name/')
            .get(GameController.getTeamByName)

        this.app.route('/guns')
            .get(PlayerController.getTopPlayersByGunName)
        return this.app;
    }
}
