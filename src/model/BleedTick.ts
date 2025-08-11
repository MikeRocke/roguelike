import { HealthAdj } from "commands/HealthAdj";
import { GameIF } from "./GameIF";
import { Mob } from "./Mob";
import { TickIF } from "./TickIF";

export class BleedTick implements TickIF {
    constructor(public mob: Mob, public game: GameIF) {}

    tick(time: number): void {
        if (time % 2) {
            return;
        }
        if (this.mob.turnsSinceMove < 2) {
            return;
        }
        let move = this.mob.turnsSinceMove;
        let random = this.game.rnd;

        let dmg = (move > 2) ? 1 : random.rndC(2, 5);
        if (this.mob.isPlayer) {
            this.game.message(`Bleeding out!! ${dmg}`);
        }
        HealthAdj.dmg(this.mob, dmg, this.game, null);
    }



}
