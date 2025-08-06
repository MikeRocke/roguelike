import { GameIF } from "model/GameIF";
import { Mob } from "model/Mob";
import { WPoint } from "model/WPoint";
import { CmdBase } from "./CmdBase";
import { DMapIF } from "model/DMapIF";
import { MoveCmd } from "./MoveCmd";
import { HitCmd } from "./HitCmd";

export class MoveBumpCmd extends CmdBase {
    constructor(public dir: WPoint, public me: Mob, public game: GameIF) {
        super(me, game);
    }

    exec(): boolean {
        let map = <DMapIF>this.game.currentMap();
        let newPoint = this.dir.plus(this.me.pos);
        let legal = map.legal(newPoint);
        if (!legal) {
            return false;
        }
        let cell = map.cell(newPoint);
        if (cell.mob && cell.mob.glyph == this.me.glyph) {
            return false;
        }
        let cmd = cell.mob
            ? new HitCmd(this.me, cell.mob, this.game)
            : new MoveCmd(this.dir, this.me, this.game);

        return cmd.turn();
    }
}
