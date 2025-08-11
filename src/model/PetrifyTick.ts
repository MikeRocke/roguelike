import { HealthAdj } from "commands/HealthAdj";
import { GameIF } from "./GameIF";
import { Mob } from "./Mob";
import { TickIF } from "./TickIF";

export class PetrifyTick implements TickIF {
    constructor(public mob: Mob, public game: GameIF) {}

    tick(time: number): void {
        if (time % 2) {
            return;
        }

        let move = this.mob.turnsSinceMove;
        if (move < 2) {
            return;
        }
        let random = this.game.rnd;

        let dmg = random.rndC(move, move*2);
        if (this.mob.isPlayer) {
            this.game.message(`Petrify!! ${dmg}`);
        }
        HealthAdj.dmg(this.mob, dmg, this.game, null);
    }



}
