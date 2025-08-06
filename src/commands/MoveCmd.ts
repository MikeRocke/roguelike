import { WPoint } from "model/WPoint";
import { CmdBase } from "./CmdBase";
import { Mob } from "model/Mob";
import { GameIF } from "model/GameIF";
import { DMapIF } from "model/DMapIF";
import { Glyph } from "model/Glyph";
import { StairCmd } from "./StairCmd";
import { Object } from "model/Object";

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
            if (this.me.isPlayer) {
                this.dealWithStairs(map, newPoint);
                this.flashIfItem();
            }
        }
        return true;
    }
    flashIfItem() {
        let map: DMapIF = <DMapIF> this.game.currentMap();
        let np = this.game.player.pos;

        let object: Object|undefined = map.cell(np).object;
        if (object) {
            let message = `${object.description()} here.`;
            this.game.flash(message);
        }
    }
    dealWithStairs(map: DMapIF, point: WPoint) {
        var dir: number;
        switch (map.cell(point).env) {
            case Glyph.StairsUp:
                dir=-1;
                break;
            case Glyph.StairsDown:
                dir = 1;
                break;
            default: return;
        }
        new StairCmd(dir, this.game).raw();
    }
}
