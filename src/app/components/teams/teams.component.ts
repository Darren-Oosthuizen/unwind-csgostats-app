import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {TeamsService} from "../../services/teams.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-teams',
    templateUrl: './teams.component.html',
    styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements AfterViewInit {

    teams!: MatTableDataSource<any>;
    isLoading = true;
    EPSILON = Number.EPSILON;

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    @ViewChild(MatSort)
    sort!: MatSort;

    tableHeadings = [
        'name',
        'totalGames',
        'totalWins',
        'totalLosses',
        'totalRounds',
        'roundDifference',
        'form',
        'winPercentage'
    ];

    constructor(private _service: TeamsService, private route: Router) {
    }


    ngAfterViewInit() {
        this._service.getTeams().subscribe(response => {
            response.forEach((row: any) => {
                const matches = [];
                for (let i = row.matchHistory.length - 1; i >= 0 && i >= row.matchHistory.length - 6; i--) {
                    matches.push(row.matchHistory[i]);
                }
                row.form = matches;
            });
            this.teams = new MatTableDataSource<any>(response);
            this.teams.paginator = this.paginator;
            this.teams.sort = this.sort;
            this.isLoading = false;
        })
    }

    public clickRow(row: any) {
        this.route.navigate(['/team/' + row.teamName]);
    }

    public hasPositiveRoundDifference(element: any) {
        return element.roundDifference > 0;
    }

    public roundDifferenceDisplay(element: any) {
        if (element.roundDifference > 0) {
            return '+' + (element.roundDifference);
        } else {
            return element.roundDifference;
        }
    }

    public getWin(game: any) {
        if (game.result === 1) {
            return 'W'
        } else {
            return 'L'
        }
    }

    public getWinClass(game: any) {
        if (game.result === 1) {
            return 'btn-success'
        } else {
            return 'btn-danger'
        }
    }

    // sortData(sort: Sort) {
    //     const data = this.desserts.slice();
    //     if (!sort.active || sort.direction === '') {
    //         this.sortedData = data;
    //         return;
    //     }
    //
    //     this.sortedData = data.sort((a, b) => {
    //         const isAsc = sort.direction === 'asc';
    //         switch (sort.active) {
    //             case 'name':
    //                 return compare(a.name, b.name, isAsc);
    //             case 'calories':
    //                 return compare(a.calories, b.calories, isAsc);
    //             case 'fat':
    //                 return compare(a.fat, b.fat, isAsc);
    //             case 'carbs':
    //                 return compare(a.carbs, b.carbs, isAsc);
    //             case 'protein':
    //                 return compare(a.protein, b.protein, isAsc);
    //             default:
    //                 return 0;
    //         }
    //     });
    // }

    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

}
