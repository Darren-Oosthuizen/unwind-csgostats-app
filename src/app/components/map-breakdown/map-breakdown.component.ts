import {AfterViewInit, Component, Input} from '@angular/core';
import {ChartData, ChartOptions} from "chart.js";

@Component({
    selector: 'app-map-breakdown',
    templateUrl: './map-breakdown.component.html',
    styleUrls: ['./map-breakdown.component.css']
})
export class MapBreakdownComponent implements AfterViewInit {

    @Input()
    maps!: any;

    mapData: ChartData<'doughnut'> = {
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

    EPSILON = Number.EPSILON;

    constructor() {
    }

    ngAfterViewInit(): void {
        const mapLabels: any[] = [];
        const mapDataWins: any[] = [];
        this.maps.forEach((map: any) => {
            mapLabels.push(map.name);
            mapDataWins.push(map.totalGames);
        });

        this.mapData = {
            labels: mapLabels,
            datasets: [
                {
                    label: "Map Distribution Chart",
                    data: mapDataWins,
                    backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
                    hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
                    hoverBorderColor: "rgba(234, 236, 244, 1)",
                }
            ]
        };
    }

}
