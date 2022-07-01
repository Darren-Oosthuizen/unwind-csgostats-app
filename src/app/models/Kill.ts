export class Kill {
    killer: string;
    killerSteamId: string;
    killerTeamName: string;
    killed: string;
    killedSteamId: string;
    killedTeamName: string;
    gun: string;
    headshot: boolean;
    time: number;
    penetrated: boolean;
    throughSmoke: boolean;
    attackerBlind: boolean;
    noscope: boolean;
    assisted: boolean;
    flashAssist: boolean;
    assisterSteamId: string;
    assisterName: string;
    assisterTeamName: string;
    friendly: boolean;
}

export default new Kill();
