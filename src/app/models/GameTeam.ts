import {GamePlayer} from "./GamePlayer";

export class GameTeam {
    players: GamePlayer[] = [];
    firstHalfScore: number = 0;
    secondHalfScore: number = 0;
    score: number = 0;
    name: string;
    result: number;


    constructor(firstHalfScore: number, secondHalfScore: number, score: number, name: string, result: number) {
        this.firstHalfScore = firstHalfScore;
        this.secondHalfScore = secondHalfScore;
        this.score = score;
        this.name = name;
        this.result = result;
    }
}
