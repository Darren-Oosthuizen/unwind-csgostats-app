import {Gun} from "./Gun";

export class GamePlayer {
    userid: number;
    steamid: string;
    team: string;
    name: string;
    kills: number = 0;
    teamKills: number = 0;
    headshots: number = 0;
    wallbangKills: number = 0;
    smokeKills: number = 0;
    noScopeKills: number = 0;
    utilityDamage: number = 0;
    teamUtilityDamage: number = 0;
    killsWhileFlashed: number = 0;
    assists: number = 0;
    deaths: number = 0;
    damage: number = 0;
    teamDamage: number = 0;
    enemiesFlashed: number = 0;
    teammatesFlashed: number = 0;
    flashDuration: number = 0;
    teamFlashDuration: number = 0;
    flashAssists: number = 0;
    mvp: number = 0;
    bombsPlanted: number = 0;
    bombsDefused: number = 0;
    gunKills: Gun[] = [];
    killReward: number = 0;
    fallDamage: number = 0;

    constructor(name: string, steamid: string, userid: number) {
        this.name = name;
        this.steamid = steamid;
        this.userid = userid;
        this.team = undefined;
    }

    reset(): void {
        this.kills = 0;
        this.teamKills = 0;
        this.headshots = 0;
        this.wallbangKills = 0;
        this.smokeKills = 0;
        this.killsWhileFlashed = 0;
        this.assists = 0;
        this.deaths = 0;
        this.damage = 0;
        this.teamDamage = 0;
        this.enemiesFlashed = 0;
        this.teammatesFlashed = 0;
        this.flashDuration = 0;
        this.teamFlashDuration = 0;
        this.utilityDamage = 0;
        this.teamUtilityDamage = 0;
        this.flashAssists = 0;
        this.mvp = 0;
        this.team = undefined;
        this.bombsPlanted = 0;
        this.bombsDefused = 0;
        this.gunKills = [];
    }
}
