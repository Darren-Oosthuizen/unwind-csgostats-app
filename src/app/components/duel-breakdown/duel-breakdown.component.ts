import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-duel-breakdown',
    templateUrl: './duel-breakdown.component.html',
    styleUrls: ['./duel-breakdown.component.css']
})
export class DuelBreakdownComponent implements OnInit {

    @Input()
    team1Players!: any;

    @Input()
    team2Players!: any;

    EPSILON = Number.EPSILON;

    constructor() {
    }

    ngOnInit(): void {
    }

    getPlayerDuels(player: any) {
        return player.playerDuels as Map<string, any>;
    }
}
