import {AfterViewInit, Component, ViewEncapsulation} from '@angular/core';
import {PlayerService} from "../../services/player.service";

@Component({
    selector: 'app-players',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class PlayersComponent implements AfterViewInit {

    isLoading = true;
    playerData: any;

    constructor(private _service: PlayerService) {
    }

    ngAfterViewInit() {
        this._service.getPlayers().subscribe(response => {
            this.playerData = response;
            this.isLoading = false;
        })
    }

}
