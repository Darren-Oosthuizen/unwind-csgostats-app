/* tslint:disable:no-string-literal */
import {AfterViewInit, Component, ViewEncapsulation} from '@angular/core';
import {PlayerService} from "../../services/player.service";
import {ActivatedRoute} from "@angular/router";
import {Chart, ChartData, ChartOptions} from 'chart.js';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class PlayerComponent implements AfterViewInit {

    isLoading = true;
    EPSILON = Number.EPSILON;
    player!: any;
    id!: number;

    entryData: ChartData<'doughnut'> = {
        datasets: [], labels: []
    };

    chartOptions: ChartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            tooltip: {
                backgroundColor: "rgb(255,255,255)",
                borderColor: '#dddfeb',
                borderWidth: 1,
                displayColors: false,
                caretPadding: 10,
                titleColor: '#008C41',
                bodyColor: '#008C41',
            },
            legend: {
                display: true
            },
        },
    };

    constructor(private _service: PlayerService, private route: ActivatedRoute) {
    }

    ngAfterViewInit() {
        this.id = this.route.snapshot.params['id'];
        this._service.getPlayer(this.id).subscribe(response => {
            this.isLoading = false;
            this.player = response;


            const entrySuccess = [this.player.firstKill, this.player.firstDeath];

            this.entryData = {
                labels: ["First Kill", "First Death"],
                datasets: [
                    {
                        label: "Entry Success Chart",
                        data: entrySuccess,
                        backgroundColor: ['#4e73df', '#ff0000'],
                        hoverBackgroundColor: ['#4e73df', '#ff0000'],
                        hoverBorderColor: "rgba(234, 236, 244, 1)",
                    }
                ]
            }

            Chart.defaults.font.family = "'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif'";
            Chart.defaults.color = '#858796';
        });
    }

}
