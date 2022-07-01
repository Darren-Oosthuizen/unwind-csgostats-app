import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-round-breakdown-line',
    templateUrl: './round-breakdown-line.component.html',
    styleUrls: ['./round-breakdown-line.component.css']
})
export class RoundBreakdownLineComponent implements OnInit {

    @Input()
    rounds!: any;

    @Input()
    totalRounds!: number;

    constructor() {
    }

    ngOnInit(): void {
    }

    getTSurvived(round: any) {
        let tAlive = 5;
        for (let i = 0; i < round.kills.length; i++) {
            if (round.kills[i].killedTeamName === 'TERRORIST') {
                tAlive = tAlive - 1;
            }
        }
        return tAlive;
    }

    getCTSurvived(round: any) {
        let ctAlive = 5;
        for (let i = 0; i < round.kills.length; i++) {
            if (round.kills[i].killedTeamName === 'CT') {
                ctAlive = ctAlive - 1;
            }
        }
        return ctAlive;
    }

    totalSurvived(survived: number, no: number) {
        if (survived > no) {
            return 'survived'
        } else { return ''}
    }
}
