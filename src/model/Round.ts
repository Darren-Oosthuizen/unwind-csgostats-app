import {Kill} from "./Kill";
import {Damage} from "./Damage";
import {Flashbang} from "./Flashbang";

export class Round {
    roundNo: number;
    winner: number;
    kills: Kill[] = [];
    damage: Damage[] = [];
    reason: number;
    playerCount: number;
    flashbangs: Flashbang[] = [];

    constructor(roundNo: number) {
        this.roundNo = roundNo;
    }
}
