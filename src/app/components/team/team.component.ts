import {AfterViewInit, Component, ViewEncapsulation} from '@angular/core';
import {TeamsService} from "../../services/teams.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class TeamComponent implements AfterViewInit {

    team: any;
    isLoading = true;

    constructor(private _service: TeamsService, private route: ActivatedRoute) {
    }

    ngAfterViewInit() {
        this._service.getTeamByName(this.route.snapshot.params.id).subscribe(response => {
            this.team = response;
            this.isLoading = false;
        });
    }

}
