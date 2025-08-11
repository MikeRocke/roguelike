import { HealthAdj } from "commands/HealthAdj";
import { GameIF } from "./GameIF";
import { Mob } from "./Mob";
import { TickIF } from "./TickIF";

export class PoisonTick implements TickIF {
    constructor(public mob: Mob, public game: GameIF) {}

    tick(time: number): void {
        if (time % 2) {
            return;
        }
        let dmg = 1;
        if (this.mob.isPlayer) {
            this.game.message(`the poison hurts: ${dmg}`);
        }
        HealthAdj.dmg(this.mob, dmg, this.game, null);
    }

}
