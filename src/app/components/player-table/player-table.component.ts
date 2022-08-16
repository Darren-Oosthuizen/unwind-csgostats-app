import {AfterViewInit, Component, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";

@Component({
    selector: 'app-player-table',
    templateUrl: './player-table.component.html',
    styleUrls: ['./player-table.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class PlayerTableComponent implements AfterViewInit {

    EPSILON = Number.EPSILON;

    public _datasource = new MatTableDataSource<any[]>([]);

    @Input()
    pagination = false;

    @ViewChild(MatPaginator, {static: false}) matPaginator!: MatPaginator;
    @ViewChild(MatSort, {static: true}) matSort!: MatSort;

    tableHeadings: any[] = [];

    constructor(private route: Router) {
        this.tableHeadings = [
            'position',
            'name',
            'kills',
            'deaths',
            'assists',
            'kd',
            'difference',
            'adr',
            'headshotPercentage',
            'clutchPercentage',
            'entrySuccess',
            'mvp',
            'win'
        ];
    }

    ngAfterViewInit(): void {
        this.tableHeadings = [
            'position',
            'name',
            'kills',
            'deaths',
            'assists',
            'kd',
            'difference',
            'adr',
            'headshotPercentage',
            'clutchPercentage',
            'entrySuccess',
            'mvp',
            'win'
        ];

    }

    @Input() set dataSource(data: any[]) {
        this.setDataSource(data);
        this._datasource.sort = this.matSort;
        this._datasource.paginator = this.matPaginator;
    }

    setDataSource(data: any) {
        this._datasource = new MatTableDataSource<any[]>(data);
    }

    public clickRow(row: any) {
        this.route.navigate(['/player/' + row.id]);
    }

    public hasPositiveKillDifference(element: any) {
        return element.kills - element.deaths > 0;
    }

    public killDifferenceDisplay(element: any) {
        if (element.kills - element.deaths > 0) {
            return '+' + (element.kills - element.deaths);
        } else {
            return (element.kills - element.deaths);
        }
    }

    getPageNum() {
        if (this.matPaginator) {
            return (this.matPaginator.pageIndex * this.matPaginator.pageSize);
        } else {
            return 0;
        }

    }
}
