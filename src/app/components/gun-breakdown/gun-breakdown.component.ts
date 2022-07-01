import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-gun-breakdown',
    templateUrl: './gun-breakdown.component.html',
    styleUrls: ['./gun-breakdown.component.css']
})
export class GunBreakdownComponent implements OnInit {

    @Input()
    guns!: any;

    EPSILON = Number.EPSILON;

    constructor() {
    }

    ngOnInit(): void {
    }
}

