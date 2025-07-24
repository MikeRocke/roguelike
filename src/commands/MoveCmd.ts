import { WPoint } from "model/WPoint";
import { CmdBase } from "./CmdBase";
import { Mob } from "model/Mob";
import { GameIF } from "model/GameIF";
import { DMapIF } from "model/DMapIF";

export class MoveCmd extends CmdBase {
    constructor(public dir: WPoint, public me: Mob, public game: GameIF) {
        super(me, game);
    }

    exec(): boolean {
        let map = <DMapIF>this.game.currentMap();
        let newPoint = this.dir.plus(this.me.pos);
        let legal = !map.blocked(newPoint);
        if (legal) {
            map.moveMob(this.me, newPoint);
        }
        return true;
    }
}
