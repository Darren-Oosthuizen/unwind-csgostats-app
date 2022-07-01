import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Game} from "../../models/Game";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GameService} from "../../services/game.service";

@Component({
    selector: 'app-submit-match',
    templateUrl: './submit-match.component.html',
    styleUrls: ['./submit-match.component.css']
})
export class SubmitMatchComponent implements OnInit {

    form: FormGroup;

    game!: Game;

    constructor(private route: ActivatedRoute, private fb: FormBuilder, private gameService: GameService, private router: Router) {
        this.game = JSON.parse(this.route.snapshot.paramMap.get('match')!) as Game;
    }

    ngOnInit(): void {
        this.form = this.fb.group({
                team1Name: new FormControl(this.game.team1.name, [Validators.required]),
                team2Name: new FormControl(this.game.team2.name, [Validators.required]),
                date: new FormControl(null, [Validators.required]),
            }
        )
    }

    saveDetails() {
        this.game.team1.name = this.form.get('team1Name')?.value;
        this.game.team2.name = this.form.get('team2Name')?.value;
        this.game.date = this.form.get('date')?.value;
        this.gameService.createGame(this.game).subscribe((response: any) => {
            this.router.navigate(['/match/' + response.id]);
        });
    }
}
