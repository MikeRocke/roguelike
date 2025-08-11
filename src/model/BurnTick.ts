import { HealthAdj } from "commands/HealthAdj";
import { GameIF } from "./GameIF";
import { Mob } from "./Mob";
import { TickIF } from "./TickIF";

export class BurnTick implements TickIF {
    constructor(public mob: Mob, public game: GameIF) {}

    tick(time: number): void {
        if (time % 2) {
            return;
        }
        let dmg = this.game.rnd.rndC(2, 4);
        if (this.mob.isPlayer) {
            this.game.message(`Burned: ${dmg}`);
        }
        HealthAdj.dmg(this.mob, dmg, this.game, null);
    }

}
