import debug from "debug";
import DashboardApi from "../service/DashboardApi";

const log: debug.IDebugger = debug('app:game-controller');

class DashboardController {

    getDashboard(req: any, res: any, next: any) {
        log("Fetching dashboard stats")
        DashboardApi.getDashboard(req, res);
    }
}

export default new DashboardController();
