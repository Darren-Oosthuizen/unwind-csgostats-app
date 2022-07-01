import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {PlayersComponent} from "./components/players/players.component";
import {TeamsComponent} from "./components/teams/teams.component";
import {PlayerComponent} from "./components/player/player.component";
import {TeamComponent} from "./components/team/team.component";
import {MatchComponent} from "./components/match/match.component";
import {GunsComponent} from "./components/guns/guns.component";
import {MatchUploadComponent} from "./components/match-upload/match-upload.component";
import {SubmitMatchComponent} from "./components/submit-match/submit-match.component";

const routes: Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'players', component: PlayersComponent},
    {path: 'teams', component: TeamsComponent},
    {path: 'team/:id', component: TeamComponent},
    {path: 'player/:id', component: PlayerComponent},
    {path: 'match/:id', component: MatchComponent},
    {path: 'guns', component: GunsComponent},
    {path: 'match-upload', component: MatchUploadComponent},
    {path: 'submit-match', component: SubmitMatchComponent},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
