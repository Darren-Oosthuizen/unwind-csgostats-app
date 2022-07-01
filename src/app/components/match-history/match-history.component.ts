import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-match-history',
    templateUrl: './match-history.component.html',
    styleUrls: ['./match-history.component.css']
})
export class MatchHistoryComponent implements OnInit {

    @Input()
    matchHistory: any[];

    @Input()
    teamName: string;

    constructor(private route: Router) {
    }

    ngOnInit(): void {

    }

    goToMatch(match: any) {
        this.route.navigate(['/match/' + match.id]);
    }

    getEnemyTeamName(match: any) {
        if (match.team1Name === this.teamName) {
            return match.team2Name;
        } else {
            return match.team1Name;
        }
    }

    getScoreLine(match: any) {
        if (match.team1Name === this.teamName) {
            return match.team1Score + ':' + match.team2Score;
        } else {
            return match.team2Score + ':' + match.team1Score;
        }
    }

    getResult(match: any) {
        if (match.team1Name === this.teamName) {
            if (match.team1Score > match.team2Score) {
                return 'bg-success';
            } else {
                return 'bg-danger';
            }
        } else {
            if (match.team1Score > match.team2Score) {
                return 'bg-danger';
            } else {
                return 'bg-success';
            }

        }
    }
}
