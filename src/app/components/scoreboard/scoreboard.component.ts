import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
    selector: 'app-scoreboard',
    templateUrl: './scoreboard.component.html',
    styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

    @Input()
    team!: any;

    @Input()
    totalRounds!: number;

    @Input()
    text!: string;

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    @ViewChild(MatSort)
    sort!: MatSort;

    @Input() set dataSource(data: any[]) {
        this.setDataSource(data);
    }

    public _datasource = new MatTableDataSource<any[]>();

    EPSILON = Number.EPSILON;

    tableHeadings : any[] = [];

    constructor() {
    }

    ngOnInit(): void {
        this.tableHeadings = [
            'name',
            'kills',
            'deaths',
            'assists',
            'kd',
            'adr',
            'headshotPercentage',
            'firstKill',
            'firstDeath',
            '5k',
            '4k',
            '3k',
            '2k',
            '1k',
            '1v5',
            '1v4',
            '1v3',
            '1v2',
            '1v1',
            'ef',
            'ud',
            'mvp',
        ];
    }

    setDataSource(data: any) {
        this._datasource = new MatTableDataSource<any[]>(data);
        this._datasource.paginator = this.paginator;
        this._datasource.sort = this.sort;
    }

}
