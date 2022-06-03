import express from "express";
import debug from "debug";
import {DemoService} from "../service/DemoService";

const log: debug.IDebugger = debug('app:app-controller');

class AppController {
    async getStats(req: express.Request, res: express.Response) {
        log("Inside the app controller");
        res.render('index', {success: 'Please select a file for processing'});
    }

    async getDashboard(req: any, res: any) {
        log("Inside the app controller - getDashboard");
        res.render('dashboard');
    }

    async uploadDemo(req: any, res: any, next: any) {
        log("Inside uploading of demo file");
        await DemoService.uploadDemoFile(req, res, next);
        res.render('index', {success: 'File has been uploaded for processing. Upload another if you\'d like'});
    }
}

export default new AppController();
