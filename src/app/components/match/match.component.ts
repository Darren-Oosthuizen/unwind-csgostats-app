import {Component, OnInit} from '@angular/core';
import {GameService} from "../../services/game.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-match',
    templateUrl: './match.component.html',
    styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

    isLoading = true;
    match!: any;
    guns!: any;

    constructor(private _service: GameService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this._service.getGameById(this.route.snapshot.params.id).subscribe(response => {
            this.match = response;
            this._service.getGunsByGameId(this.route.snapshot.params.id).subscribe(guns => {
                this.guns = guns;
                this.isLoading = false;
            });
        })
    }

}
