import { HealthAdj } from "commands/HealthAdj";
import { GameIF } from "./GameIF";
import { Mob } from "./Mob";
import { TickIF } from "./TickIF";

export class FreezeTick implements TickIF {
    constructor(public mob: Mob, public game: GameIF) {}

    tick(time: number): void {
        if (time % 2) {
            return;
        }
        if (this.mob.turnsSinceMove < 2) {
            return;
        }
        let dmg = this.game.rnd.rndC(0, 4);
        if (this.mob.isPlayer) {
            this.game.message(`Feeling cold!! ${dmg}`);
        }
        HealthAdj.dmg(this.mob, dmg, this.game, null);
    }

}
