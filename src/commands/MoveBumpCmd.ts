import { GameIF } from "model/GameIF";
import { Mob } from "model/Mob";
import { WPoint } from "model/WPoint";
import { CmdBase } from "./CmdBase";
import { DMapIF } from "model/DMapIF";
import { MoveCmd } from "./MoveCmd";
import { HitCmd } from "./HitCmd";
import { Able } from "./Able";
import { Act } from "./Act";
import { Buff } from "model/Buff";

export class MoveBumpCmd extends CmdBase {
    constructor(public dir: WPoint, public me: Mob, public game: GameIF) {
        super(me, game);
    }

    exec(): boolean {
        let game = this.game;
        this.confused(game, this.dir);
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
    confused(game: GameIF, dir: WPoint): boolean {
        if (!this.me.is(Buff.Confuse)) {
            return false;
        }
        let r = game.rnd;
        if (r.oneIn(2)) {
            return false;
        }
        if (this.me.isPlayer) {
            game.message(`Player is confused`);
        }
        let cd = r.rndDir2();
        dir.x = cd.x;
        dir.y = cd.y;
        return true;
    }

    able(mob: Mob, game: GameIF, act: Act): Able {
        return { able: true, turn: false };
    }
}
