import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {PlayersComponent} from './components/players/players.component';
import {TeamsComponent} from './components/teams/teams.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {HttpClientModule} from "@angular/common/http";
import {MaterialModule} from "./material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PlayerComponent} from './components/player/player.component';
import {TeamComponent} from './components/team/team.component';
import {NgChartsModule} from "ng2-charts";
import { MapBreakdownComponent } from './components/map-breakdown/map-breakdown.component';
import { PlayerTableComponent } from './components/player-table/player-table.component';
import { MatchHistoryComponent } from './components/match-history/match-history.component';
import { MatchComponent } from './components/match/match.component';
import { MatchTeamComponent } from './components/match-team/match-team.component';
import { GunBreakdownComponent } from './components/gun-breakdown/gun-breakdown.component';
import { GunsComponent } from './components/guns/guns.component';
import { RoundBreakdownComponent } from './components/round-breakdown/round-breakdown.component';
import { DuelBreakdownComponent } from './components/duel-breakdown/duel-breakdown.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { RoundBreakdownLineComponent } from './components/round-breakdown-line/round-breakdown-line.component';
import { MatchUploadComponent } from './components/match-upload/match-upload.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SubmitMatchComponent } from './components/submit-match/submit-match.component';
import {MatSelectModule} from "@angular/material/select";

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        PlayersComponent,
        TeamsComponent,
        NavigationComponent,
        PlayerComponent,
        TeamComponent,
        MapBreakdownComponent,
        PlayerTableComponent,
        MatchHistoryComponent,
        MatchComponent,
        MatchTeamComponent,
        GunBreakdownComponent,
        GunsComponent,
        RoundBreakdownComponent,
        DuelBreakdownComponent,
        ScoreboardComponent,
        RoundBreakdownLineComponent,
        MatchUploadComponent,
        SubmitMatchComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FontAwesomeModule,
        HttpClientModule,
        MaterialModule,
        BrowserAnimationsModule,
        NgChartsModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
