import { WPoint } from "model/WPoint";
import { CmdBase } from "./CmdBase";
import { Mob } from "model/Mob";
import { GameIF } from "model/GameIF";
import { DMapIF } from "model/DMapIF";
import { Glyph } from "model/Glyph";

export class DigCmd extends CmdBase {
    constructor(public dir: WPoint, public me: Mob, public game: GameIF) {
        super(me, game);
    }

    exec(): boolean {
        let game = this.game;
        let player = game.player;
        let map = <DMapIF>game.currentMap();
        let newPoint = player.pos.plus(this.dir);
        let cell = map.cell(newPoint);
        let env = cell.env;
        if (env != Glyph.Wall && env != Glyph.Rock) {
            game.flash(`No rock to dig!`);
            return false;
        }
        let rnd = game.rnd;
        let dug = rnd.oneIn(10);
        if (dug) {
            cell.env = Glyph.Floor;
            game.message(`Player broke the rock`);
        } else {
            game.flash(`digging...`);
        }
        return true;
    }
}
