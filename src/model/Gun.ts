export class Gun {
    name: string;
    kills: number = 0;
    headshots: number = 0;
    damage: number = 0;
    teamDamage: number = 0;

    constructor(name: string) {
        this.name = name;
    }
}
