import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-round-breakdown',
    templateUrl: './round-breakdown.component.html',
    styleUrls: ['./round-breakdown.component.css']
})
export class RoundBreakdownComponent implements OnInit {

    @Input()
    rounds!: any;


    constructor() {
    }

    ngOnInit(): void {
    }

    getRoundTime(kill: any) {
        return Math.floor(kill.time / 60) + ":" + (kill.time % 60 ? (kill.time % 60).toString().padStart(2, '0') : '00')
    }
}
