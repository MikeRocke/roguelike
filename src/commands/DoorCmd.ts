import { WPoint } from "model/WPoint";
import { CmdBase } from "./CmdBase";
import { GameIF } from "model/GameIF";
import { Mob } from "model/Mob";
import { CmdIF } from "./CmdIF";
import { Glyph } from "model/Glyph";
import { DMapIF } from "model/DMapIF";

export class DoorCmd extends CmdBase {
    dir: WPoint = new WPoint();
    constructor(public me: Mob, public g: GameIF) {
        super(me, g);
    }

    setDir(dir: WPoint): CmdIF {
        this.dir = dir;
        return this;
    }

    exec(): boolean {
        let position = this.me.pos;
        let door = position.plus(this.dir);
        let map = <DMapIF>this.game.currentMap();
        let cell = map.cell(door);
        switch (cell.env) {
            case Glyph.DoorsOpen:
                cell.env = Glyph.DoorsClosed;
                break;

            case Glyph.DoorsClosed:
                cell.env = Glyph.DoorsOpen;
                break;
            default:
                this.game.flash("No door here!");
                return false;
        }
        this.msg(cell.env);
        return true;
    }

    msg(env: Glyph) {
        let open = (env == Glyph.DoorsOpen);
        let action = open ? 'opens' : 'closes';
        let who = this.me.name;
        this.game.message(`${who} ${action} the door`);
    }
}
