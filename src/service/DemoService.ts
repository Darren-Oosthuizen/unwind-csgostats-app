import formidable from "formidable";
import fs from "fs";
import debug from "debug";
import {StatService} from "./StatService";

const log: debug.IDebugger = debug('app:demo-service');

export class DemoService {

    constructor() {
        log("Constructing DemoService");
    }

    static async uploadDemoFile(req: any, res: any, next: any) {
        const form = new formidable.IncomingForm();
        log('Parsing uploaded file');
        form.parse(req, (err: any, fields: any, files: any) => {
            const oldpath = files.demo.path;
            log('Old file path: ' + oldpath);
            const newpath = files.demo.name;
            log('New file path: ' + newpath);
            fs.rename(oldpath, newpath, (error: any) => {
                if (error) throw error;
                log("Saved file. Processing Demo File");
                StatService.getStats(newpath, fields.demoName);
            });
        });
    }
}

export default new DemoService();
