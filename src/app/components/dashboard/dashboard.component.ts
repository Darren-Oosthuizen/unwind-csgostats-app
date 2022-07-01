import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../../services/dashboard.service";
import {Dashboard} from "../../models/Dashboard";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    dashboard: Dashboard = new Dashboard();
    isLoading = true;

    constructor(private _service: DashboardService) {
        this._service = _service;
    }

    ngOnInit(): void {
        this._service.getDashboard().subscribe(response => {
            this.dashboard = response;
            this.isLoading = false;
        })
    }

}
