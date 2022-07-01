import {Component, OnInit} from '@angular/core';
import {GameService} from "../../services/game.service";

@Component({
    selector: 'app-guns',
    templateUrl: './guns.component.html',
    styleUrls: ['./guns.component.css']
})
export class GunsComponent implements OnInit {

    guns!: any;

    constructor(private _service: GameService) {
    }

    ngOnInit(): void {
        this._service.getAllGuns().subscribe(response => {
            this.guns = response;
        })
    }

}
