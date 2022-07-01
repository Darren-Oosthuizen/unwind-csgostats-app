import {GamePlayer} from "./GamePlayer";
import {GameTeam} from "./GameTeam";
import {Round} from "./Round";

export class Game {
    id: string;
    players: GamePlayer[] = [];
    team1: GameTeam;
    team2: GameTeam;
    spectators: GameTeam;
    map: string
    rounds: Round[] = [];
    ctscore: number = 0;
    tscore: number = 0;
    date: Date;

    constructor(id : string) {
        this.id = id;
        this.ctscore = 0;
        this.tscore = 0;
    }

    public toString() {
        let str = "=========================================================================================================";
        str = str.concat("\n");
        str = str.concat("CT Score: " + this.ctscore + "\n");
        str = str.concat("T Score: " + this.tscore + "\n");
        str = str.concat("|" + "NAME".padEnd(29));
        str = str.concat("|KILLS".padEnd(10) + "|ASSISTS".padEnd(10)+ "|DEATHS".padEnd(10) + "|MVP's|\n");
        this.players.forEach((player, i) => {
            if (player.team === 'Terrorists' || player.team === 'Counter-Terrorists') {
                str = str.concat(player.name.padEnd(30));
                str = str.concat("| ");
                str = str.concat(player.kills.toString().padEnd(10));
                str = str.concat("| ");
                str = str.concat(player.assists.toString().padEnd(10));
                str = str.concat("| ");
                str = str.concat(player.deaths.toString().padEnd(10));
                str = str.concat("| ");
                str = str.concat(player.mvp.toString());
                str = str.concat("|\n");
            }
        })
        str = str.concat("=========================================================================================================")
        return str
    }
}
